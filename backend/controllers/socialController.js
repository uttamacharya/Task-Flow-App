const User = require('../models/User');
const Task = require('../models/Task');
// const Section = require('../models/Section');

// Get productivity stats to share
exports.getProductivityStats = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        // 1. Get completed tasks count
        const completedTasks = await Task.countDocuments({
            userId,
            status: 'completed'
        });

        // 2. Get total tasks count
        const totalTasks = await Task.countDocuments({ userId });

        // 3. Get completion rate
        const completionRate = totalTasks > 0 
            ? Math.round((completedTasks / totalTasks) * 100) 
            : 0;

        // 4. Get recent achievements (last 3 completed tasks)
        const recentTasks = await Task.find({
            userId,
            status: 'completed'
        })
        .sort({ completedAt: -1 })
        .limit(5)
        .select('title completedAt priority');

        // 5. Get section-wise completion
        const sections = await Section.find({ userId });
        const sectionStats = await Promise.all(
            sections.map(async (section) => {
                const sectionTasks = await Task.countDocuments({
                    userId,
                    sectionId: section._id
                });
                const completedSectionTasks = await Task.countDocuments({
                    userId,
                    sectionId: section._id,
                    status: 'completed'
                });
                
                return {
                    sectionName: section.customName || section.name,
                    total: sectionTasks,
                    completed: completedSectionTasks,
                    color: section.color
                };
            })
        );

        // Prepare shareable data
        const productivityStats = {
            user: await User.findById(userId).select('username'),
            summary: {
                totalTasks,
                completedTasks,
                completionRate: `${completionRate}%`,
                currentStreak: await calculateCurrentStreak(userId),
                sectionsCount: sections.length
            },
            recentAchievements: recentTasks,
            sectionPerformance: sectionStats,
            timestamp: new Date().toLocaleDateString('hi-IN')
        };

        res.json({
            success: true,
            stats: productivityStats,
            shareMessage: generateShareMessage(productivityStats)
        });

    } catch (error) {
        console.error('Get Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Share productivity report
exports.shareReport = async (req, res) => {
    try {
        const { platform, message, includeDetails } = req.body;
        const userId = req.user.userId;

        // Get user data
        const user = await User.findById(userId).select('username');
        
        // Get basic stats
        const completedTasks = await Task.countDocuments({
            userId,
            status: 'completed'
        });

        const totalTasks = await Task.countDocuments({ userId });
        
        // Prepare share data
        const shareData = {
            platform,
            message: message || `I've completed ${completedTasks}/${totalTasks} tasks on TaskFlow! 🚀`,
            user: user.username,
            stats: {
                completed: completedTasks,
                total: totalTasks,
                completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
            },
            timestamp: new Date().toISOString(),
            shareUrl: `https://taskflow.app/user/${userId}` // Example URL
        };

        // Log the share (in real app, call social media API)
        console.log('📱 Social Share:', shareData);

        res.json({
            success: true,
            message: 'Productivity report ready to share!',
            shareData,
            platforms: {
                twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.message)}`,
                whatsapp: `https://wa.me/?text=${encodeURIComponent(shareData.message)}`,
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.shareUrl)}`
            }
        });

    } catch (error) {
        console.error('Share Report Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Export productivity data as JSON
exports.exportData = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const [user, tasks, sections] = await Promise.all([
            User.findById(userId).select('-password'),
            Task.find({ userId }),
            Section.find({ userId })
        ]);

        const exportData = {
            user,
            tasks,
            sections,
            summary: {
                totalTasks: tasks.length,
                completedTasks: tasks.filter(t => t.status === 'completed').length,
                pendingTasks: tasks.filter(t => t.status === 'pending').length,
                sectionsCount: sections.length,
                exportDate: new Date().toISOString()
            }
        };

        res.json({
            success: true,
            data: exportData,
            format: 'json',
            downloadUrl: `/api/social/export/download/${Date.now()}.json`
        });

    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Helper functions
async function calculateCurrentStreak(userId) {
    const completedTasks = await Task.find({
        userId,
        status: 'completed'
    }).sort({ completedAt: -1 });

    if (completedTasks.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < completedTasks.length; i++) {
        const taskDate = new Date(completedTasks[i].completedAt);
        taskDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((today - taskDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === i) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

function generateShareMessage(stats) {
    const messages = [
        `Just completed ${stats.summary.completedTasks} tasks with ${stats.summary.completionRate} completion rate! 🎯`,
        `Productivity streak: ${stats.summary.currentStreak} days on TaskFlow! 🔥`,
        `Managed ${stats.summary.sectionsCount} productivity sections with ${stats.summary.totalTasks} total tasks! 📊`,
        `🚀 Making progress: ${stats.summary.completedTasks} tasks done, ${stats.summary.completionRate} completion rate!`
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
}