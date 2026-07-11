// Service content reproduced verbatim from the live secureyourhacks.com service
// pages. Slugs match the "Ask a vCISO" catalog so the chatbot's recommendation
// cards, the navbar, and the footer all link to the same pages.
// (A few obvious source typos were corrected: "implify" -> "Simplify",
// "pen and Deep Web" -> "Open and Deep Web".)

export type ServiceSection = {
  heading?: string;
  body?: string;
  bullets?: string[];
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  sections: ServiceSection[];
  sourceUrl: string;
};

export const SERVICES: Service[] = [
  {
    slug: "vciso",
    title: "Virtual CISO (vCISO)",
    tagline: "Fortify Your Business with Virtual CISO Expertise",
    intro:
      "Small and mid-sized businesses often face a challenge: maintaining robust cybersecurity without a dedicated security leader. Secure Your Hacks can help. Our Virtual Chief Information Security Officer (vCISO) service provides access to a team of security experts, empowering your organization.",
    sections: [
      { heading: "Focus on Your Core Business", body: "Our vCISO team takes the reins on your information security strategy, freeing your internal IT team to focus on core competencies." },
      { heading: "Gain Invaluable Guidance", body: "Secure Your Hacks' vCISO acts as an extension of your leadership, providing expert advice on security objectives and conducting thorough vulnerability assessments." },
      { heading: "Benefit from Long-Term Partnership", body: "Unlike a traditional CISO, our vCISO team becomes a semi-permanent fixture within your organization, ensuring continuity and alignment with both short and long-term security goals." },
      { heading: "Enjoy Cost-Effective Security Measures", body: "Our CISO-as-a-service model offers crucial security activities like penetration testing and vulnerability assessments at a fraction of the cost of hiring a full-time CISO." },
      { heading: "Cultivate a Security-Conscious Culture", body: "Our vCISO team empowers your employees with effective security training and helps develop industry-leading information security practices." },
      { heading: "Maintain Regulatory Compliance", body: "Stay on top of evolving regulations with our expert guidance. Our vCISO consulting services ensure your critical systems and data remain compliant." },
      { heading: "What is a vCISO?", body: "A vCISO is a contracted security expert (or team) that provides the same level of strategic security oversight as a traditional CISO, but on a more flexible and cost-effective basis." },
      {
        heading: "vCISO Responsibilities",
        bullets: [
          "Security Operations: Our team provides real-time threat detection and incident response capabilities.",
          "Cybersecurity Risk Management: We stay up-to-date on emerging threats and translate that knowledge into actionable insights for your leadership.",
          "Security Architecture: Our vCISO team assists in planning and implementing essential cybersecurity tools and technologies.",
          "Data Loss Prevention: We provide guidance and education to your staff on how to prevent data breaches and misuse.",
          "Access Management: Our vCISO consulting services ensure only authorized personnel have access to sensitive information.",
          "Compliance Management: We help navigate complex regulatory landscapes and ensure your organization adheres to all relevant security frameworks.",
        ],
      },
      { heading: "Why Choose Secure Your Hacks?", body: "We go beyond basic vCISO services. We offer a dedicated vCISO team that becomes an integrated part of your organization, providing ongoing support and collaboration to strengthen your security posture. Our experienced CISO leadership brings a wealth of knowledge to help you build and maintain a robust information security program, no matter your existing security expertise. Partner with Secure Your Hacks and achieve enterprise-grade security without the enterprise-level cost." },
    ],
    sourceUrl: "https://secureyourhacks.com/virtual-ciso-vciso/",
  },
  {
    slug: "consultancy",
    title: "Cyber Security Consultancy",
    tagline: "Shield Your Business with Expert Cyber Security Consulting",
    intro:
      "In today's digital landscape, cyber threats are a constant reality. Businesses of all sizes face relentless attacks targeting data, websites, and applications. Secure Your Hacks offers comprehensive cyber security consulting services to help you fortify your defenses. Our team of seasoned consultants brings a wealth of expertise to every project.",
    sections: [
      { heading: "Unmatched Expertise", body: "We specialize in cyber security governance, with a proven track record protecting critical infrastructure across various sectors. From finance to healthcare, and from aerospace to government agencies, we've got you covered." },
      { heading: "Risk Management", body: "Our consultants conduct thorough information security assessments, pinpointing vulnerabilities and recommending actionable steps to bolster your security posture." },
      { heading: "Compliance Made Easy", body: "We navigate the complexities of cyber security regulations, ensuring your organization stays compliant and avoids costly penalties." },
      { heading: "Peace of Mind", body: "Our services go beyond technical solutions. We provide peace of mind by mitigating risks that could lead to financial loss, reputational damage, and legal repercussions." },
      {
        heading: "Our Cyber Security Consulting Program",
        body: "We offer a comprehensive program designed to optimize your security posture, including:",
        bullets: [
          "Information Security Strategy & Design: Our consultants collaborate with you to craft a customized security strategy aligned with your specific needs and goals.",
          "Virtual CISO (VCISO) Services: Get access to a dedicated security expert who provides ongoing guidance, manages incident response, and ensures your security strategy stays current with the latest threats.",
          "Data Governance: We help you manage and protect your valuable data assets, ensuring compliance with relevant regulations.",
        ],
      },
      {
        heading: "Specialized Consulting Services",
        body: "Additionally, we offer a range of specialized consulting services, including:",
        bullets: [
          "Digital Forensics: Investigate security incidents and uncover critical evidence.",
          "Vulnerability and Risk Assessments: Identify and prioritize security weaknesses before they can be exploited.",
          "Policy and Plan Development: Establish clear and actionable security policies and procedures.",
          "Configuration Management: Optimize your security settings and close configuration gaps.",
          "Security Architecture Design: Craft a robust security architecture that safeguards your entire IT infrastructure.",
        ],
      },
      { heading: "Partner with Secure Your Hacks and take control of your cyber security", body: "We provide the expertise and services you need to build a strong defense and achieve lasting peace of mind." },
    ],
    sourceUrl: "https://secureyourhacks.com/cyber-security-consultancy/",
  },
  {
    slug: "vapt",
    title: "Vulnerability Assessment & Penetration Testing (VAPT)",
    tagline: "Uncover and Eradicate Threats: Vulnerability Assessment & Penetration Testing (VAPT)",
    intro:
      "Is your organization truly secure? Traditional security measures often have blind spots. Secure Your Hacks offers comprehensive Vulnerability Assessment and Penetration Testing (VAPT) services to identify and eliminate weaknesses before attackers exploit them.",
    sections: [
      { heading: "Our 360° Approach", body: "We go beyond technology. Our VAPT considers physical security, human factors, and technology to provide a holistic risk assessment." },
      { heading: "Expert-Led Analysis", body: "Our seasoned team identifies potential threats and vulnerabilities, keeping you ahead of the curve." },
      { heading: "Tailored Solutions", body: "We assess your strengths and weaknesses across various areas, from network security to executive protection." },
      {
        heading: "Services You Can Trust",
        bullets: [
          "Vulnerability Assessments: Regular scans pinpoint vulnerabilities in applications and configurations, ensuring your defenses stay strong.",
          "Application Security Assessments: We identify and address security weaknesses within your applications.",
          "Phishing Assessments: Test your employees' awareness of phishing attempts to mitigate social engineering risks.",
          "Penetration Testing: Our ethical hackers simulate real-world attacks to uncover critical vulnerabilities.",
        ],
      },
      {
        heading: "Benefits of VAPT",
        bullets: [
          "Proactive Protection: Identify and address weaknesses before attackers can exploit them.",
          "Reduced Risk: Minimize the potential impact of security breaches on your operations and data.",
          "Compliance Assurance: Meet industry and regulatory security requirements.",
          "Peace of Mind: Gain confidence in your organization's security posture.",
        ],
      },
      {
        heading: "Deep Dives",
        bullets: [
          "Extensive Vulnerability Assessments: We prioritize vulnerabilities based on severity, providing clear remediation steps.",
          "Secure Your Hacks VAPT Service: A comprehensive suite of services including internal/external testing, red teaming, and web application assessments.",
          "Vulnerability Management: We collaborate with you to establish a program for ongoing identification, prioritization, and remediation of vulnerabilities.",
        ],
      },
      { heading: "Take control of your cyber security", body: "Don't wait for a breach to discover your weaknesses. Partner with Secure Your Hacks and take control of your cyber security." },
    ],
    sourceUrl: "https://secureyourhacks.com/vulnerability-assessment-penetration-testing/",
  },
  {
    slug: "audit-compliance",
    title: "Audit & Compliance",
    tagline: "Demystifying Compliance: Your Partner for Audit & Security Success",
    intro:
      "Feeling lost in the labyrinth of compliance regulations? Secure Your Hacks is your one-stop for navigating audits and achieving security with confidence.",
    sections: [
      {
        heading: "We partner with businesses of all sizes to",
        bullets: [
          "Simplify Compliance: Our experts translate complex regulations into clear, actionable steps.",
          "Reduce Risk: We identify and address vulnerabilities before they become compliance roadblocks.",
          "Streamline Audits: Our team prepares you for audits with efficient processes and documentation.",
          "Boost Confidence: Gain peace of mind knowing you're on the right track with your security posture.",
        ],
      },
      {
        heading: "Here's what sets us apart",
        body: "We offer a comprehensive program designed to optimize your security posture, including:",
        bullets: [
          "Tailored Approach: No cookie-cutter solutions here. We assess your specific needs and create a customized compliance roadmap.",
          "Deep Expertise: Our team stays up-to-date on evolving regulations, ensuring your compliance strategy remains effective.",
          "Proactive Support: We go beyond just ticking boxes. We identify potential issues and help you mitigate risks before they arise.",
          "Seamless Collaboration: We work closely with your team to ensure a smooth and efficient auditing process.",
        ],
      },
      {
        heading: "Don't let compliance overwhelm you",
        body: "Partner with Secure Your Hacks and achieve:",
        bullets: [
          "Reduced Costs: Avoid costly fines and penalties associated with non-compliance.",
          "Enhanced Reputation: Demonstrate your commitment to security and build trust with stakeholders.",
          "Improved Efficiency: Streamline internal processes and free up resources for core business activities.",
          "Sustainable Security: Build a solid foundation for ongoing compliance and a strong security posture.",
        ],
      },
      {
        heading: "Compliance Made Easy: Secure Your Hacks Security Services",
        body: "Compliance doesn't have to be a headache. Secure Your Hacks Security offers a comprehensive suite of services to help organizations of all sizes achieve and maintain compliance with a wide range of industry standards. Here's how we can help:",
        bullets: [
          "Compliance Expertise: Our team stays up-to-date on evolving regulations, ensuring your compliance strategy remains effective.",
          "Streamlined Validation Process: We make compliance achievable with efficient and scalable assessments, regardless of your organization's size.",
          "Consolidated Approach: Need to comply with multiple standards? We can combine them into a single assessment, saving you time and resources.",
          "Program Development: Don't have a compliance program in place? We can help you build one from the ground up.",
          "Ongoing Support: Compliance is a continuous journey. We're here to support you long-term, ensuring you stay compliant.",
        ],
      },
      {
        heading: "We offer a wide range of compliance services, including",
        bullets: [
          "PCI DSS/ASV: Get your Attestation of Compliance efficiently.",
          "NERC CIP: Protect critical cyber assets in the North American bulk power system.",
          "CCPA: Ensure compliance with the California Consumer Privacy Act.",
          "HIPAA/HITECH: Safeguard patient data and achieve HIPAA compliance.",
          "HITRUST: Receive your HITRUST CSF assessment and certification.",
          "NIST 800-171 & DFARS: Meet Department of Defense data security requirements.",
          "EU GDPR: Ensure compliance with the European Union's General Data Protection Regulation.",
          "DPO Services: Appoint a dedicated Data Protection Officer for your organization.",
          "SOC 2: Obtain a SOC 2 report tailored to your specific needs.",
          "CMMC: Become compliant with the Cybersecurity Maturity Model Certification (CMMC).",
          "FINRA Cybersecurity Requirements: Implement best-in-class security measures to avoid breaches.",
          "CryptoCurrency Security Standards (CCSS): Ensure the security of your clients' cryptocurrency.",
          "IRS E-FILE Standards: Secure your clients' tax data online.",
          "ADA Website Accessibility Standards: Make your website accessible to everyone.",
        ],
      },
      { heading: "Don't wait until it's too late", body: "Partner with Secure Your Hacks Security today and achieve compliance with confidence!" },
    ],
    sourceUrl: "https://secureyourhacks.com/audit-compliances/",
  },
  {
    slug: "edr-mdr-xdr",
    title: "EDR, MDR & XDR",
    tagline: "Your Comprehensive Guide to Modern Threat Defense",
    intro:
      "Standing on the frontline of cybersecurity requires powerful tools to combat ever-evolving threats. Endpoint Detection and Response (EDR), Managed Detection and Response (MDR), and Extended Detection and Response (XDR) – the cornerstones of modern cybersecurity defense. We'll delve into these solutions and showcase offerings from industry leaders like Qualys, Sequrite, Kaspersky, Seceon, and Trellix.",
    sections: [
      {
        heading: "Understanding EDR/MDR/XDR",
        body: "These acronyms represent a layered approach to cybersecurity, focusing on detecting, responding to, and mitigating threats across various IT infrastructure levels.",
        bullets: [
          "EDR (Endpoint Detection and Response): Focuses on individual devices (endpoints) like desktops, laptops, and servers. It monitors endpoint activity, detects suspicious behavior, and facilitates response actions.",
          "MDR (Managed Detection and Response): Builds upon EDR by offering a security operations center (SOC) that provides 24/7 threat monitoring, analysis, and response expertise. Ideal for organizations lacking the resources to maintain a dedicated security team.",
          "XDR (Extended Detection and Response): Expands beyond endpoints, encompassing network traffic, cloud workloads, and user behavior. It provides a unified view of security data across the entire IT landscape for more comprehensive threat detection.",
        ],
      },
      {
        heading: "How EDR/MDR/XDR Solutions Benefit Your Organization",
        bullets: [
          "Proactive Threat Detection: Identify and neutralize potential threats before they escalate into major incidents.",
          "Continuous Monitoring: Maintain constant vigilance across your IT environment to stay ahead of emerging threats.",
          "Automated Response: Streamline incident response with automated actions for swift mitigation, minimizing damage.",
          "Threat Intelligence Integration: Leverage real-time threat intelligence to proactively defend against evolving cyberattacks.",
        ],
      },
      {
        heading: "Leading EDR/MDR/XDR Providers",
        bullets: [
          "Qualys: Offers a unified EDR/MDR/XDR suite for holistic threat defense across endpoints, networks, and cloud environments.",
          "Sequrite: Employs advanced behavioral analytics and automated threat hunting to provide robust cybersecurity.",
          "Kaspersky: Leverages machine learning and threat intelligence for comprehensive threat detection and automated response.",
          "Seceon: Delivers real-time threat detection with advanced analytics and empowers security teams with proactive threat hunting capabilities.",
          "Trellix: Offers a scalable and flexible architecture with integrated threat intelligence, fostering collaboration and visibility across your security efforts.",
        ],
      },
      {
        heading: "How These Solutions Work",
        body: "EDR/MDR/XDR solutions combine powerful technologies to fortify your defenses:",
        bullets: [
          "Behavioral Analytics: Analyzes user and system activity to identify anomalies indicative of potential threats.",
          "Threat Intelligence Integration: Integrates real-time threat feeds to keep your organization informed about the latest cyber threats.",
          "Automated Response: Automates response actions to threats, minimizing reaction time and potential damage.",
        ],
      },
      {
        heading: "Invest in Your Security Future",
        body: "EDR/MDR/XDR solutions empower organizations to take a proactive approach to cybersecurity. By implementing these solutions, you gain:",
        bullets: [
          "Proactive Threat Defense: Identify and neutralize threats before they disrupt your operations.",
          "Efficient Incident Response: Minimize damage and downtime with swift response capabilities.",
          "Comprehensive Visibility: Gain a holistic view of your IT landscape for better threat detection and mitigation.",
          "Scalability: Adapt your threat defense strategy as your organization's IT infrastructure evolves.",
        ],
      },
    ],
    sourceUrl: "https://secureyourhacks.com/edr-mdr-xdr/",
  },
  {
    slug: "smart-contracts",
    title: "Smart Contract Security & Auditing",
    tagline: "Building on a Solid Foundation: Secure Your Blockchain Ventures with Smart Contract Auditing and Advisory",
    intro:
      "The promise of blockchain technology is undeniable, but its potential can only be fully realized with secure smart contracts. At Secure Your Hacks, we offer expert smart contract auditing and advisory services to empower your blockchain ventures.",
    sections: [
      {
        heading: "Why Choose Secure Your Hacks?",
        bullets: [
          "Unparalleled Expertise: Our team of seasoned professionals possesses deep knowledge of blockchain technology and smart contract security best practices.",
          "Comprehensive Auditing: We conduct thorough audits, meticulously examining your smart contracts for vulnerabilities and potential exploits.",
          "Actionable Insights: We deliver clear, actionable reports that detail identified issues and recommend effective mitigation strategies.",
          "Proactive Approach: We go beyond just identifying problems. We offer guidance to enhance your smart contract security posture from the ground up.",
          "Streamlined Development: Our collaboration helps you build secure and reliable smart contracts, saving you time and resources in the long run.",
        ],
      },
      {
        heading: "Don't Risk Your Blockchain Dreams",
        body: "Smart contract vulnerabilities can have devastating consequences, leading to:",
        bullets: [
          "Financial Loss: Hackers can exploit vulnerabilities to steal your cryptocurrency or manipulate contract functionality for personal gain.",
          "Reputational Damage: Security breaches can erode trust in your project and severely impact your reputation.",
          "Operational Disruption: Buggy smart contracts can malfunction, hindering your project's functionality and user experience.",
        ],
      },
      {
        heading: "Our Smart Contract Auditing and Advisory Services",
        bullets: [
          "Smart Contract Security Audits: We rigorously test your smart contracts for vulnerabilities such as integer overflows, reentrancy attacks, and logic flaws.",
          "Security Code Reviews: Our experts meticulously analyze your code to identify potential security weaknesses before deployment.",
          "Threat Modeling & Risk Assessment: We help you identify and mitigate potential security threats throughout the smart contract development lifecycle.",
          "Best Practices Guidance: We share industry best practices and security considerations to help you build more secure smart contracts from the start.",
          "Ongoing Support: We're here to assist you throughout your blockchain development journey, providing ongoing security guidance and support.",
        ],
      },
      {
        heading: "Peace of Mind for a Secure Future",
        body: "Partnering with Secure Your Hacks for smart contract auditing and advisory services empowers you to:",
        bullets: [
          "Build Trust with Investors and Users: Demonstrating your commitment to security fosters trust and confidence in your project.",
          "Minimize Risks and Maximize ROI: Early identification and mitigation of vulnerabilities safeguards your investment and protects your project's future.",
          "Focus on Innovation: Secure smart contracts allow you to focus on development and innovation, driving your blockchain project forward.",
        ],
      },
      { heading: "Ready to Secure Your Blockchain Future?", body: "Contact Secure Your Hacks today and discuss your smart contract auditing and advisory needs. Let's build a secure and successful blockchain venture together!" },
    ],
    sourceUrl: "https://secureyourhacks.com/smart-contracts/",
  },
  {
    slug: "training",
    title: "Customized Corporate Training & Security Awareness",
    tagline: "Why Cyber Security Training Is Important",
    intro:
      "Technical security alone can't win the cyber war. Firewalls and encryption are crucial, but they're not invincible. All it takes is one employee to fall victim to a phishing email, and your entire system is at risk.",
    sections: [
      { heading: "Cybercriminals target the human element", body: "Even the most well-intentioned employees can make mistakes, especially when faced with clever social engineering tactics." },
      { heading: "Training is your first line of defense against human error", body: "By educating your team on cyber threats and best practices, you empower them to identify and avoid risks. This ongoing awareness reduces the chance of a single click bringing your entire operation to a halt." },
      { heading: "What Is Cyber Security Awareness Training?", body: "Cyberattacks don't just target technology, they target people. Hackers know that manipulating employees is often easier than breaking complex systems. Cyber security awareness training fights fire with education. This training equips your team with the knowledge to recognize and avoid common threats. Effective programs are more than a one-time thing. Ongoing training ensures everyone stays up-to-date on the latest tactics and reinforces best practices. This creates a culture of security within your organization, making it much harder for attackers to succeed." },
      {
        heading: "What Are the Benefits of Training in Cyber Security?",
        body: "Investing in cyber security training goes beyond ticking a compliance box. A well-trained workforce offers a range of benefits:",
        bullets: [
          "Stronger Defenses: Employees become a first line of defense, spotting and avoiding phishing attempts and other social engineering tricks. This reduces the number of security incidents and keeps your data safer.",
          "Compliance Made Easy: Regular training ensures everyone is up-to-date on the latest policies and regulations. This reduces the risk of non-compliance fines and legal headaches.",
          "Smoother Operations: When everyone understands best practices, teams collaborate more effectively. This leads to fewer security-related delays and keeps productivity high.",
          "Faster Recovery: In the event of a cyberattack, a security-aware workforce can respond quickly and efficiently. This minimizes damage and downtime, saving your company time and money.",
        ],
      },
      {
        heading: "Our Cyber Security Training Program: Combating Phishing",
        bullets: [
          "Unlimited Phishing Tests: Regularly simulate real-world phishing attacks to sharpen your employees' detection skills.",
          "Automated Security Awareness Program: Streamline training with automated modules that keep your team informed on the latest phishing tactics.",
          "Phish Alert Button: Empower employees to easily report suspicious emails, fostering a collaborative defense.",
          "Phishing Reply Tracking: Track how employees respond to phishing attempts, identify areas for improvement and measure training effectiveness.",
        ],
      },
      {
        heading: "Building a Culture of Security",
        bullets: [
          "Security 'Hints & Tips': Provide bite-sized, engaging security awareness content for ongoing learning.",
          "EZXploit™ - \"Automated Human Pentesting\": Simulate social engineering attacks to identify vulnerabilities in human behavior and empower employees with better defense strategies.",
          "Social Engineering Indicators: Equip your team to recognize common social engineering tactics used by attackers.",
          "Smart Groups: Tailor training content to specific employee roles and risk levels.",
        ],
      },
      {
        heading: "Comprehensive Protection",
        bullets: [
          "Automated Training Campaigns: Schedule automated training modules to ensure consistent knowledge reinforcement.",
          "Training Access Levels I, II & III: Offer tiered training programs catering to different employee needs and experience levels.",
          "Crypto-Ransom Guarantee (details to be clarified): Provide peace of mind with a potential financial safety net in case of ransomware attacks.",
          "Active Directory Integration: Simplify user management and training access.",
        ],
      },
      {
        heading: "Advanced Features (optional)",
        bullets: [
          "Vishing Security Test: Simulate voice phishing attacks to test employee awareness and response.",
          "USB Drive Test: Identify vulnerabilities associated with physical media access.",
          "Vulnerable Browser Plugin Detection: Proactively identify and address security risks posed by outdated browser plugins.",
          "Priority Level Support: Ensure timely assistance with any security concerns.",
          "AIDA™ Artificial Intelligence-driven Agent (BETA): Explore the potential of AI for future enhancements in security training.",
        ],
      },
      { heading: "Why Continuous Cyber Security Awareness Training Matters", body: "Cybercriminals are like shape-shifters. Their tactics morph and evolve constantly, making it crucial to stay ahead of the curve. That's where continuous cyber security awareness training comes in. Our training integrates formal modules with simulated phishing attacks that feel real; we deploy randomized mock attacks in various forms; we treat every mistake as a learning opportunity; and we provide actionable insights and metrics. In short, continuous training doesn't just educate, it empowers." },
    ],
    sourceUrl: "https://secureyourhacks.com/corporate-it-training/",
  },
  {
    slug: "osint",
    title: "Open Source Intelligence (OSINT)",
    tagline: "Uncovering Digital Threats: Securing Your Brand in the Virtual Age",
    intro:
      "This document outlines how our comprehensive security solutions empower organizations to proactively safeguard their brand and data in the digital landscape.",
    sections: [
      { heading: "Brand Protection in the Virtual Space", body: "We offer robust brand protection services that ensure a pristine online reputation. We actively monitor for and eliminate counterfeit websites, digital piracy, and unauthorized use of your brand assets." },
      {
        heading: "Dark Web Monitoring: Uncovering Hidden Threats",
        body: "Our advanced dark web monitoring services combine cutting-edge technology with human expertise to deliver unparalleled security. This proactive approach allows companies to identify and prevent security breaches faster.",
        bullets: [
          "24/7 Dark Web Monitoring: We continuously monitor the dark web to detect suspicious activity related to your organization.",
          "Data Breach Discovery: We can identify data breaches that may have exposed your sensitive information.",
        ],
      },
      {
        heading: "Comprehensive Dark Web & Digital Assets Protection (DDAP)",
        body: "Our innovative DDAP services go beyond traditional dark web monitoring. We offer a range of services to protect your digital assets, including:",
        bullets: [
          "Digital Legal Investigation: Gather internal and external information relevant for legal proceedings.",
          "Insider Threat Detection: Identify potential insider threats based on their connections and online activity.",
          "Social Media Investigation: Analyze social media activity for potential threats.",
          "Open and Dark Web Monitoring: Monitor both the open and dark web for mentions of your organization and sensitive data.",
          "Phone Number Information: Track phone number associations with potential threats.",
        ],
      },
      {
        heading: "Proactive Protection with Dark Web Monitoring Services",
        body: "Our dark web monitoring services offer proactive protection against data breaches and leaks. We continuously monitor for:",
        bullets: [
          "Breached Credentials: Identify compromised login credentials associated with your organization.",
          "Sensitive Documents: Track the appearance of sensitive documents on the dark web.",
          "Digital Asset Monitoring: Monitor for unauthorized exposure of your digital assets.",
        ],
      },
      {
        heading: "Benefits of Secure Your Hacks Dark Web Monitoring",
        bullets: [
          "Early Detection of Compromised Credentials: Mitigate the risk of breaches by detecting compromised credentials at the earliest stage.",
          "Stolen Corporate Credential Monitoring: Track stolen corporate credentials associated with your organization.",
          "Executive and Privileged User Protection: Safeguard the credentials of high-profile users.",
          "Rapid Response to Compromised Credentials: Receive immediate alerts upon discovering compromised credentials on the dark web.",
        ],
      },
      { heading: "Real-Time Alerts and Actionable Intelligence", body: "Secure Your Hacks utilizes advanced technology and partnerships to monitor the dark web for compromised user credentials such as emails, usernames, and passwords. This enables us to send real-time alerts and provide actionable intelligence to prevent security breaches." },
      {
        heading: "Dark Web Threat Intelligence and Asset Protection Services",
        body: "We provide a comprehensive suite of services for dark web monitoring and asset protection, including:",
        bullets: [
          "Domain and IP Intelligence: Gather intelligence on domains and IP addresses associated with threats.",
          "Online Asset Monitoring: Track your online presence to identify potential threats.",
          "Open and Deep Web Forum Search: Monitor forums on both the open and deep web for relevant information.",
          "Open and Deep Web Marketplace Search: Search marketplaces across the web for exposed data.",
          "Enterprise Email Address Monitoring: Monitor for compromised enterprise email addresses.",
          "Breached Account Data Tracking: Track leaked account data associated with your organization.",
          "Credential Monitoring: Continuously monitor for compromised credentials.",
          "Metadata Analysis: Extract insights from metadata associated with potentially threatening information.",
          "Government and Business Records Monitoring: Track mentions of your organization in government and business records.",
          "Site Archives Analysis: Analyze archived website data to identify potential vulnerabilities.",
          "Intellectual Property Data Protection: Monitor for unauthorized use of your intellectual property.",
          "Cyber Attack & Dark Web Breach Intelligence Alerts: Receive immediate alerts regarding cyber attacks and dark web breaches that involve your organization.",
          "Incident Response Services: Our team of experts is available to assist in the event of a security breach.",
        ],
      },
      { heading: "What is Dark Web Monitoring?", body: "Dark web monitoring, also known as cyber monitoring, is a service that tracks the dark web for mentions of your personal information or sensitive data. This allows for early detection of potential threats and helps mitigate the risk of identity theft." },
    ],
    sourceUrl: "https://secureyourhacks.com/osint/",
  },
  {
    slug: "managed-soc",
    title: "Managed SOC",
    tagline: "Unmatched Security: 24/7 Protection with Secure Your Hacks' SOCaaS",
    intro:
      "Feeling overwhelmed by cybersecurity threats? Secure Your Hacks' Managed Security Operations Center (SOC) as a Service (SOCaaS) provides around-the-clock protection and peace of mind.",
    sections: [
      {
        heading: "Why Choose Secure Your Hacks' SOCaaS?",
        bullets: [
          "Expert Security Team: Our certified professionals handle Managed Detection and Response (MDR), SIEM, DLP, DNS Filtering, AEP, and CASB, proactively safeguarding your organization.",
          "Advanced Threat Detection: We analyze your network to strategically deploy sensors and log collectors, ensuring comprehensive threat monitoring.",
          "24/7 Threat Hunting & Response: Our dedicated security analysts constantly monitor for threats, distinguish real attacks from false positives, and guide your IT team on appropriate actions.",
          "Scalable Security Solutions: We understand every business is unique. Our flexible SOCaaS adapts to your budget and security needs.",
          "Enhanced Endpoint Protection: Reduce the time to detect and respond to endpoint threats with our advanced detection, forensics, and round-the-clock monitoring.",
        ],
      },
      {
        heading: "Unparalleled Security Coverage",
        bullets: [
          "Continuous Monitoring: We relentlessly monitor your systems, identifying and stopping threats before they compromise your data.",
          "On-Demand MDR Services: In the event of an incident, our team provides immediate response and remediation.",
          "Managed Threat Hunting: We go beyond basic monitoring, actively searching for hidden threats within your network.",
          "Malware Analysis: Suspicious malware samples are thoroughly analyzed to determine their nature and potential impact.",
          "Post-Incident Verification: We ensure complete eradication of threats, preventing attackers from regaining access.",
        ],
      },
      {
        heading: "Cost-Effective Security",
        bullets: [
          "Reduced Risk: Our proactive approach minimizes the likelihood and impact of cyberattacks.",
          "Improved Compliance: Meet industry compliance standards with our comprehensive security monitoring.",
          "Resource Optimization: Free up your IT staff to focus on core business activities.",
        ],
      },
      {
        heading: "Benefits of Secure Your Hacks' SOCaaS",
        bullets: [
          "Peace of Mind: Gain confidence knowing your organization is protected by a team of security specialists.",
          "Enhanced Security Posture: Strengthen your defenses against evolving cyber threats.",
          "Improved Incident Response: Effectively respond to and recover from security breaches.",
        ],
      },
      {
        heading: "Leading EDR/MDR/XDR Providers",
        bullets: [
          "Qualys: Offers a unified EDR/MDR/XDR suite for holistic threat defense across endpoints, networks, and cloud environments.",
          "Sequrite: Employs advanced behavioral analytics and automated threat hunting to provide robust cybersecurity.",
          "Kaspersky: Leverages machine learning and threat intelligence for comprehensive threat detection and automated response.",
          "Seceon: Delivers real-time threat detection with advanced analytics and empowers security teams with proactive threat hunting capabilities.",
          "Trellix: Offers a scalable and flexible architecture with integrated threat intelligence, fostering collaboration and visibility across your security efforts.",
        ],
      },
      {
        heading: "We offer a range of SOCaaS solutions, including",
        bullets: [
          "Fully Managed SOC: We handle all aspects of your security operations.",
          "Co-Managed SOC: We collaborate with your existing security team.",
          "Hybrid SOC: We customize a solution that meets your specific needs.",
        ],
      },
    ],
    sourceUrl: "https://secureyourhacks.com/managed-soc/",
  },
  {
    slug: "grc",
    title: "Governance, Risk & Compliance (GRC)",
    tagline: "Simplify Security, Compliance, and Risk Management with Secure Your Hacks GRCaaS",
    intro:
      "Feeling overwhelmed by complex GRC challenges? Secure Your Hacks' GRCaaS (Governance, Risk, and Compliance as a Service) platform empowers businesses to streamline risk management, ensure compliance, and strengthen security posture – all within a user-friendly cloud-based solution.",
    sections: [
      {
        heading: "Here's how Secure Your Hacks GRCaaS helps you achieve peace of mind",
        bullets: [
          "Unified Platform: Manage IT & Security Risk, Digital Risk & Controls, Operational Risk, Third-Party Risk, and more – all in one place.",
          "Simplified Compliance: Decipher complex regulations and demonstrate compliance with ease. Gain clear insights into your security posture with a user-friendly interface.",
          "Risk Management Made Easy: Identify, assess, and mitigate risks proactively. Set risk tolerance levels and establish a culture of risk awareness across your organization.",
          "Enhanced Decision-Making: Gain real-time visibility into potential threats, allowing you to make informed decisions quickly.",
        ],
      },
      {
        heading: "Key Features & Benefits",
        bullets: [
          "Streamlined Audit Operations: Reduce audit fatigue with automated workflows and centralized risk data.",
          "Enhanced Risk Management: Proactive identification, prioritization, and remediation of vulnerabilities.",
          "Actionable Insights: Turn data into actionable intelligence for improved risk decision-making.",
          "Compliance Roadmap: Navigate compliance requirements with a clear path to security maturity.",
          "Automated Policy Management: Save time with automated policy generation based on your risk assessments.",
          "Centralized Issue Management: Coordinate and track risk remediation efforts seamlessly.",
          "Scalable GRC Framework: Our platform grows with your business, ensuring ongoing effectiveness.",
          "Regulatory Compliance Management: Stay up-to-date on evolving regulations and avoid costly fines.",
        ],
      },
      {
        heading: "Supported Regulations",
        body: "Our platform simplifies compliance with a wide range of regulations, including:",
        bullets: [
          "HIPAA", "HITECH", "GLBA", "CCPA", "DFAR & CMMC", "FISMA", "GDPR", "NYDFS", "ISO 27000", "NIST", "PCI DSS",
        ],
      },
      {
        heading: "What are GRC Platforms?",
        body: "GRC platforms are powerful tools for managing risk across your entire organization. They help businesses:",
        bullets: [
          "Define and implement enterprise-wide risk management strategies.",
          "Organize and analyze risk information.",
          "Track incidents and measure risk factors.",
          "Modify operations to comply with regulations.",
        ],
      },
      {
        heading: "Take Control of Your GRC Today",
        body: "Secure Your Hacks GRCaaS empowers organizations to:",
        bullets: [
          "Develop a strong risk and compliance culture.",
          "Make confident security decisions.",
          "Achieve risk-ready oversight of business processes.",
          "Strengthen ethics and employee behavior.",
        ],
      },
      { heading: "Don't wait", body: "Transform your GRC with Secure Your Hacks. Request a free demo today and see how we can simplify security and compliance for your organization." },
    ],
    sourceUrl: "https://secureyourhacks.com/grc/",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
