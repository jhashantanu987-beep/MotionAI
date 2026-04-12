import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SummarySection from '../components/SummarySection';
import LeadCard from '../components/LeadCard';
import TaskCard from '../components/TaskCard';
import TimelineBar from '../components/TimelineBar';
import FloatingPanel from '../components/FloatingPanel';
import { mockData } from '../data/mockData';

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6"
            >
                <SummarySection />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {mockData.leads.map((lead) => (
                        <LeadCard key={lead.id} avatarUrl={lead.avatar} name={lead.name} tags={lead.tags} />
                    ))}
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {mockData.tasks.map((task) => (
                            <TaskCard key={task.id} title={task.title} description={task.status} isHighlighted={task.status === 'In Progress'} onClick={() => {}} />
                        ))}
                    </div>
                </div>
                <TimelineBar />
            </motion.div>
            <FloatingPanel />
        </Layout>
    );
};

export default Dashboard;