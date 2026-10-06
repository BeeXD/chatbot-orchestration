export const INITIAL_CHATBOTS = [
  {
    id: "bot-1",
    name: "Customer Support Agent",
    platform: "WhatsApp",
    description: "Automated tier-1 client ticketing, delivery tracking, and returns management for retail shoppers.",
    intents: ["Order Tracking", "Refund Status", "Agent Escalation", "Business Hours"],
    status: "active",
    environment: "Production",
    model: "GPT-4o",
    createdAt: "2026-09-14T08:24:00.000Z",
    totalConversations: 14820,
    successRate: "94.2%",
    welcomeMessage: "Hello! Welcome to our retail support on WhatsApp. How can I assist you with your order today?"
  },
  {
    id: "bot-2",
    name: "Internal DevOps Sentinel",
    platform: "Slack",
    description: "Kubernetes pod restarts, CI/CD pipeline triggers, and alert remediation assistant for engineering teams.",
    intents: ["Pod Health Check", "Trigger Deploy", "Rollback Release", "On-Call Paging"],
    status: "active",
    environment: "Production",
    model: "Claude 3.5 Sonnet",
    createdAt: "2026-09-20T14:12:00.000Z",
    totalConversations: 3950,
    successRate: "98.7%",
    welcomeMessage: "DevOps Sentinel online. Type /deploy, /status, or query active cluster alerts."
  },
  {
    id: "bot-3",
    name: "SaaS Onboarding Concierge",
    platform: "Web",
    description: "Interactive in-app widget guiding new trial users through workspace creation and feature discovery.",
    intents: ["Product Tour", "Plan Upgrade", "Invite Teammates", "API Key Setup"],
    status: "active",
    environment: "Production",
    model: "Gemini 1.5 Pro",
    createdAt: "2026-10-01T11:45:00.000Z",
    totalConversations: 8210,
    successRate: "91.8%",
    welcomeMessage: "Welcome to our cloud suite! What would you like to configure first?"
  },
  {
    id: "bot-4",
    name: "Developer Community Moderator",
    platform: "Discord",
    description: "Welcome bot welcoming new Discord community members, verifying GitHub links, and answering tech FAQs.",
    intents: ["Verify Contributor", "Documentation Search", "Code Snippet Helper", "Rules & Guidelines"],
    status: "active",
    environment: "Staging",
    model: "GPT-4o",
    createdAt: "2026-10-02T16:30:00.000Z",
    totalConversations: 5120,
    successRate: "96.4%",
    welcomeMessage: "Hey there developer! Welcome to the Discord guild. Ask me anything about our open-source tools."
  },
  {
    id: "bot-5",
    name: "Enterprise HR Helpdesk",
    platform: "Teams",
    description: "Corporate Teams bot for PTO requests, benefit inquiries, and workplace policy assistance.",
    intents: ["Apply PTO", "Health Benefits", "Payroll FAQ", "IT Ticket Request"],
    status: "inactive",
    environment: "Development",
    model: "Claude 3.5 Sonnet",
    createdAt: "2026-10-04T09:15:00.000Z",
    totalConversations: 640,
    successRate: "89.1%",
    welcomeMessage: "Hello! I am your Enterprise HR Assistant in Microsoft Teams. How may I help you today?"
  },
  {
    id: "bot-6",
    name: "E-Commerce Checkout Assistant",
    platform: "Web",
    description: "High-conversion shopping cart recovery and promotional code validation assistant.",
    intents: ["Apply Discount", "Shipping Rates", "Payment Methods", "Item Availability"],
    status: "active",
    environment: "Production",
    model: "Gemini 1.5 Pro",
    createdAt: "2026-10-05T13:20:00.000Z",
    totalConversations: 6730,
    successRate: "93.5%",
    welcomeMessage: "Need help completing your order? I can check active coupon codes or delivery times for you!"
  }
];

export const AVAILABLE_PLATFORMS = [
  { id: "all", name: "All Platforms", icon: "Layers" },
  { id: "Web", name: "Web Chat", icon: "Globe", color: "var(--platform-web)", bg: "var(--platform-web-bg)" },
  { id: "WhatsApp", name: "WhatsApp", icon: "MessageCircle", color: "var(--platform-whatsapp)", bg: "var(--platform-whatsapp-bg)" },
  { id: "Slack", name: "Slack", icon: "Hash", color: "var(--platform-slack)", bg: "var(--platform-slack-bg)" },
  { id: "Discord", name: "Discord", icon: "MessageSquare", color: "var(--platform-discord)", bg: "var(--platform-discord-bg)" },
  { id: "Teams", name: "MS Teams", icon: "Users", color: "var(--platform-teams)", bg: "var(--platform-teams-bg)" }
];
