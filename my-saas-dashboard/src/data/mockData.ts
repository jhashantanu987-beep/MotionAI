export const mockLeads = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    tags: ["New", "VIP"],
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    tags: ["Follow-up"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    tags: ["Potential"],
  },
  {
    id: 4,
    name: "Bob Brown",
    avatar: "https://i.pravatar.cc/150?img=4",
    tags: ["Contacted"],
  },
];

export const mockTasks = [
  {
    id: 1,
    title: "Design new landing page",
    status: "In Progress",
    dueDate: "2023-10-15",
  },
  {
    id: 2,
    title: "Prepare presentation for client",
    status: "Pending",
    dueDate: "2023-10-20",
  },
  {
    id: 3,
    title: "Update project documentation",
    status: "Completed",
    dueDate: "2023-10-10",
  },
];

export const mockTimelineEvents = [
  {
    id: 1,
    title: "Project Kickoff",
    date: "2023-09-01",
  },
  {
    id: 2,
    title: "First Client Meeting",
    date: "2023-09-15",
  },
  {
    id: 3,
    title: "Design Phase Completed",
    date: "2023-09-30",
  },
  {
    id: 4,
    title: "Development Phase Started",
    date: "2023-10-01",
  },
];

export const mockData = {
  leads: mockLeads,
  tasks: mockTasks,
  timelineEvents: mockTimelineEvents,
};