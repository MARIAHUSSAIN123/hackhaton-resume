// src/data/infoContent.js

import { Mail, Globe, Cpu, Shield, Layout, Sparkles, Download, MessageSquare, Info, Users, BarChart3 } from 'lucide-react';

const infoContent = {
  // --- NAV BAR LINKS ---
  process: {
    title: "The NeonVault Protocol",
    subtitle: "Your Path to Digital Dominance",
    image: "/src/assets/modal_images/process_flow.jpg", // Create this image
    paragraphs: [
      "Our streamlined 3-step process ensures you build a cutting-edge resume with maximum efficiency and impact. We guide you from template selection to final deployment, making every step intuitive and powerful.",
      "First, you'll dive into our exclusive template vault, designed by industry-leading futurists. Next, our AI-powered neural network optimizes your content for both human recruiters and advanced ATS systems. Finally, with a single click, your high-resolution, pixel-perfect resume is ready for global deployment."
    ],
    cta: { text: "Start Building Now", action: () => alert("Navigating to editor!") }
  },
  services: {
    title: "Unleashing Advanced Capabilities",
    subtitle: "Our Core Systems Explained",
    image: "/src/assets/modal_images/services_overview.jpg", // Create this image
    paragraphs: [
      "NeonVault offers a suite of integrated services designed to give you an unparalleled edge in the competitive job market of 2026. Each service is meticulously crafted using bleeding-edge technology and aesthetic principles.",
      "From AI-driven content generation that understands industry nuances to military-grade cloud encryption, we ensure your professional identity is not only visually stunning but also strategically powerful and securely stored."
    ],
    cta: { text: "Explore All Features", action: () => alert("Exploring features...") }
  },
  about: {
    title: "About NeonVault: Our Vision",
    subtitle: "Pioneering the Future of Professional Identity",
    image: "/src/assets/modal_images/about_vision.jpg", // Create this image
    paragraphs: [
      "Founded in 2026 by a collective of AI specialists and design futurists, NeonVault emerged from a critical need: to revolutionize the stagnant landscape of resume building. We saw that traditional CVs were failing to capture the dynamic essence of modern professionals.",
      "Our mission is to empower innovators, developers, and creatives with tools that transform their career data into a compelling, visually stunning digital legacy. We're not just building resumes; we're crafting the future of work, one glowing profile at a time."
    ],
    cta: { text: "Meet Our Team", action: () => alert("Team info coming soon!") }
  },
  contact: {
    title: "Neural Sync: Get In Touch",
    subtitle: "Your Gateway to the NeonVault Network",
    image: "/src/assets/modal_images/contact_network.jpg", // Create this image
    paragraphs: [
      "Whether you have a critical technical inquiry, an exciting partnership proposal, or simply want to connect with our community, NeonVault's communication channels are always open and encrypted.",
      "Our dedicated support team is ready to assist you in navigating the complexities of your professional journey, while our social platforms offer a vibrant space to interact with fellow pioneers and stay updated on the latest industry insights and platform advancements."
    ],
    cta: { text: "Open Communication Channel", action: () => window.location.href = 'mailto:info@neonvault.io' }
  },

  // --- PROCESS SECTION CARDS ---
  process01: {
    title: "Scan & Select: The Template Vault",
    subtitle: "Your First Step to a Glowing Profile",
    image: "/src/assets/modal_images/process_select.jpg", // Create this image
    paragraphs: [
      "Dive into NeonVault's exclusive collection of designer-grade templates. Each template is engineered for maximum visual impact and ATS (Applicant Tracking System) compatibility, ensuring your resume gets noticed by both AI and human recruiters.",
      "From minimalist cyber-chic to vibrant neon-punk, find the perfect aesthetic that reflects your unique professional identity. Our intuitive preview system allows you to see your data come alive in real-time."
    ],
    cta: { text: "Browse Templates", action: () => alert("Navigating to template selection!") }
  },
  process02: {
    title: "Neural Sync: AI Content Optimization",
    subtitle: "Supercharge Your Resume with Intelligence",
    image: "/src/assets/modal_images/process_ai.jpg", // Create this image
    paragraphs: [
      "Leverage NeonVault's proprietary AI engine to infuse your resume with high-frequency industry keywords, powerful action verbs, and compelling impact statements. Our AI analyzes your role, industry, and target jobs to give you a strategic advantage.",
      "Beyond basic grammar checks, the Neural Sync feature refines your narrative, ensuring every word resonates with recruiters and positions you as a top-tier candidate in the digital realm."
    ],
    cta: { text: "Learn About AI", action: () => alert("More AI info here!") }
  },
  process03: {
    title: "Final Deploy: Conquer the Industry",
    subtitle: "Your High-Resolution Digital Asset",
    image: "/src/assets/modal_images/process_deploy.jpg", // Create this image
    paragraphs: [
      "With a single click, transform your meticulously crafted profile into a high-resolution, print-ready PDF. Our export engine ensures pixel-perfect rendering across all devices and platforms, from desktop screens to mobile recruiters and robust ATS systems.",
      "Your final asset is optimized for universal compatibility, ensuring that your digital legacy shines bright, no matter where it's viewed. Deploy with confidence and secure your next-gen career opportunity."
    ],
    cta: { text: "Export Your Resume", action: () => alert("Exporting now!") }
  },

  // --- SERVICES SECTION CARDS ---
  serviceAI: {
    title: "Advanced AI Content Engine",
    subtitle: "Intelligent Resume Generation",
    image: "/src/assets/modal_images/service_ai_detail.jpg", // Create this image
    paragraphs: [
      "NeonVault's AI engine is more than just a suggestion tool. It's a dynamic neural network that understands the nuances of various industries and job roles. It analyzes your input against millions of successful profiles to generate compelling, keyword-rich content.",
      "This ensures your resume not only sounds professional but also ranks higher in Applicant Tracking Systems (ATS), dramatically increasing your visibility to potential employers."
    ],
    cta: { text: "Experience AI Magic", action: () => alert("AI Demo!") }
  },
  serviceSecurity: {
    title: "Military-Grade Cloud Encryption",
    subtitle: "Your Data is Our Priority",
    image: "/src/assets/modal_images/service_security_detail.jpg", // Create this image
    paragraphs: [
      "We employ state-of-the-art Firebase SSL-256 bit encryption to protect every byte of your personal and professional data. Your resume assets are stored securely in the cloud, protected against unauthorized access and cyber threats.",
      "NeonVault is committed to maintaining the highest standards of digital security, giving you peace of mind that your valuable career information is always safe and accessible only by you."
    ],
    cta: { text: "View Security Protocols", action: () => alert("Security info here.") }
  },
  serviceGlobal: {
    title: "Universal Export & Global Sync",
    subtitle: "Your Resume, Anywhere, Anytime",
    image: "/src/assets/modal_images/service_global_detail.jpg", // Create this image
    paragraphs: [
      "NeonVault guarantees pixel-perfect PDF exports that maintain integrity across all operating systems, devices, and printer specifications. Our global synchronization ensures your latest resume is always accessible from any authorized device, instantly.",
      "This feature is crucial for professionals on the go, allowing you to update and share your profile seamlessly across international borders and diverse technological ecosystems."
    ],
    cta: { text: "Start Global Deployment", action: () => alert("Global deployment info!") }
  },

  // --- ABOUT US STATS ---
  aboutUsers: {
    title: "Powering Over 150,000 Professionals",
    subtitle: "The Growing NeonVault Community",
    image: "/src/assets/modal_images/about_users.jpg", // Create this image
    paragraphs: [
      "Our community of active users spans across every continent, comprising developers, designers, project managers, and innovators who trust NeonVault to elevate their careers. We're proud to be the platform of choice for the next generation of digital talent.",
      "Join a network of ambitious professionals who are not just building resumes, but crafting digital legacies that stand out in a crowded market. Your success is our ultimate metric."
    ],
    cta: { text: "Join the Community", action: () => alert("Community portal coming soon!") }
  },
  aboutSuccess: {
    title: "Unmatched 99.8% Success Rate",
    subtitle: "Proven Results in the Digital Arena",
    image: "/src/assets/modal_images/about_success.jpg", // Create this image
    paragraphs: [
      "NeonVault's users consistently report higher interview rates and successful job placements. Our 99.8% success rate is a testament to the effectiveness of our AI optimization, cutting-edge designs, and user-centric platform.",
      "We constantly refine our algorithms and update our templates based on real-world recruitment data, ensuring you always have the most potent tool in your job-hunting arsenal."
    ],
    cta: { text: "Read Success Stories", action: () => alert("Success stories here.") }
  },

  // --- CONTACT US CARDS ---
  contactSupport: {
    title: "Direct Support Channel",
    subtitle: "Assistance When You Need It",
    image: "/src/assets/modal_images/contact_support.jpg", // Create this image
    paragraphs: [
      "Our dedicated support specialists are available around the clock to assist you with any technical issues, platform queries, or content advice. Expect prompt and intelligent responses within 12 neural cycles (hours).",
      "We pride ourselves on providing exceptional user support, ensuring your experience with NeonVault is seamless and productive. Your success is our priority."
    ],
    cta: { text: "Email Support Now", action: () => window.location.href = 'mailto:support@neonvault.io' }
  },
  contactInquiries: {
    title: "General Inquiries & Partnerships",
    subtitle: "Connect with Our Executive Team",
    image: "/src/assets/modal_images/contact_inquiry.jpg", // Create this image
    paragraphs: [
      "For business proposals, partnership opportunities, media inquiries, or general questions about NeonVault's vision and future, please reach out to our executive team. We are always open to collaborations that push the boundaries of innovation.",
      "We believe in fostering strong relationships across the tech ecosystem and are eager to explore how we can grow together in the digital landscape of 2026."
    ],
    cta: { text: "Send Business Inquiry", action: () => window.location.href = 'mailto:hello@neonvault.io' }
  },
  contactSocial: {
    title: "Connect on Social Networks",
    subtitle: "Join Our Vibrant Digital Community",
    image: "/src/assets/modal_images/contact_social.jpg", // Create this image
    paragraphs: [
      "Stay updated with the latest NeonVault news, features, industry insights, and community events by connecting with us on our official social media channels. Join over 50,000 professionals shaping the future of work.",
      "Engage with our content, participate in discussions, and become a part of the vibrant NeonVault network. Your voice helps us innovate and grow."
    ],
    cta: { text: "Follow Us Now", action: () => window.open('https://linkedin.com/company/neonvault', '_blank') }
  },
};

export default infoContent;