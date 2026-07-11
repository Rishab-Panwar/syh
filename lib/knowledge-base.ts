// Secure Your Hacks knowledge base, inlined for Ask SecureBot. Small enough
// (~20 sections) to feed the whole thing to Gemini per query, so no vector DB
// is needed and answers can never miss a relevant section.

// Fixed catalog — slugs match the site's service pages so the UI can link cards.
export const SERVICE_CATALOG: { slug: string; title: string }[] = [
  { slug: "vciso", title: "Virtual CISO (vCISO)" },
  { slug: "consultancy", title: "Cyber Security Consultancy" },
  { slug: "vapt", title: "Vulnerability Assessment & Penetration Testing (VAPT)" },
  { slug: "audit-compliance", title: "Audit & Compliance" },
  { slug: "edr-mdr-xdr", title: "EDR, MDR, XDR" },
  { slug: "smart-contracts", title: "Smart Contract Security & Auditing" },
  { slug: "training", title: "Customized Corporate Training & Security Awareness" },
  { slug: "osint", title: "OSINT" },
  { slug: "managed-soc", title: "Managed SOC" },
  { slug: "grc", title: "Governance, Risk & Compliance (GRC)" },
];

export const KNOWLEDGE_BASE = `
[Company Overview]
Secure Your Hacks IT Private Limited is a cybersecurity company and your one-stop partner for all cybersecurity needs, offering expert guidance and advanced solutions to businesses navigating the ever-present dangers of the digital world. Our tagline is "The Right Approach to Cyber Security" and our mission is "Building a More Secure Digital World." Our team of security professionals brings extensive technical backgrounds across multiple domains; we become an extension of your team and translate your security objectives into practical implementations. We operate through three pillars: Expert Advisory, Deep-Tech Solutions, and World-Class Training. Why choose us: a proven track record across diverse industries; a collaborative style; adoption of the latest security technologies; and dedication to service excellence. We protect infrastructure across sectors including finance, healthcare, aerospace, and government, and serve organizations of all sizes, with particular strength helping small and mid-sized businesses that need enterprise-grade security without a large in-house team. We are based in Gurugram, Haryana, India. To speak with a human expert, use the "Talk to an Expert" option or the Contact page.

[Service: Virtual CISO (vCISO)]
Fortify Your Business with Virtual CISO Expertise. Small and mid-sized businesses often face a challenge: maintaining robust cybersecurity without a dedicated security leader. Our vCISO service provides access to a team of security experts. Focus on Your Core Business: our vCISO team takes the reins on your information security strategy. Gain Invaluable Guidance: our vCISO acts as an extension of your leadership, providing expert advice and vulnerability assessments. Benefit from Long-Term Partnership: our vCISO team becomes a semi-permanent fixture. Enjoy Cost-Effective Security Measures at a fraction of the cost of a full-time CISO. A vCISO is a contracted security expert (or team) that provides the same strategic security oversight as a traditional CISO but on a more flexible, cost-effective basis. Responsibilities include Security Operations, Cybersecurity Risk Management, Security Architecture, Data Loss Prevention, Access Management, and Compliance Management.

[Service: Cyber Security Consultancy]
Shield Your Business with Expert Cyber Security Consulting. Businesses of all sizes face relentless attacks targeting data, websites, and applications. Unmatched Expertise: we specialize in cyber security governance across finance, healthcare, aerospace, and government. Risk Management: thorough information security assessments pinpointing vulnerabilities. Compliance Made Easy: navigating cyber security regulations. Our program includes Information Security Strategy & Design, Virtual CISO (vCISO) Services, and Data Governance, plus specialized services: Digital Forensics, Vulnerability and Risk Assessments, Policy and Plan Development, Configuration Management, and Security Architecture Design.

[Service: Vulnerability Assessment and Penetration Testing (VAPT)]
Uncover and Eradicate Threats. Traditional security measures often have blind spots. Our 360-degree Approach considers physical security, human factors, and technology. Services: Vulnerability Assessments (regular scans), Application Security Assessments, Phishing Assessments (test employee awareness), and Penetration Testing (ethical hackers simulate real-world attacks). Benefits: Proactive Protection, Reduced Risk, Compliance Assurance (industry and regulatory requirements), and Peace of Mind. Our suite includes internal/external testing, red teaming, and web application assessments, plus a Vulnerability Management program for ongoing identification, prioritization, and remediation.

[Service: Audit and Compliance]
Demystifying Compliance: Your Partner for Audit & Security Success. We partner with businesses to Simplify Compliance, Reduce Risk, Streamline Audits, and Boost Confidence, with a Tailored Approach and customized compliance roadmap. Services include Compliance Expertise, a Streamlined Validation Process, a Consolidated Approach (combine multiple standards into a single assessment), Program Development, and Ongoing Support. We cover a wide range of frameworks: PCI DSS/ASV (Attestation of Compliance), NERC CIP, CCPA, HIPAA/HITECH, HITRUST (CSF assessment and certification), NIST 800-171 & DFARS, EU GDPR, DPO Services, SOC 2, CMMC, FINRA Cybersecurity Requirements, CryptoCurrency Security Standards (CCSS), IRS E-FILE Standards, and ADA Website Accessibility Standards.

[Service: EDR, MDR, and XDR]
Your Comprehensive Guide to Modern Threat Defense. EDR focuses on individual devices (endpoints) — monitors endpoint activity, detects suspicious behavior, enables response. MDR builds on EDR with a security operations center providing 24/7 threat monitoring, analysis, and response, ideal for organizations lacking a dedicated security team. XDR expands beyond endpoints to network traffic, cloud workloads, and user behavior for a unified view. Benefits: Proactive Threat Detection, Continuous Monitoring, Automated Response, and Threat Intelligence Integration. Technology partners: Qualys, Sequrite, Kaspersky, Seceon, and Trellix.

[Service: Smart Contract Security and Auditing]
Secure Your Blockchain Ventures with Smart Contract Auditing and Advisory. Smart contract vulnerabilities can cause Financial Loss (theft, manipulation), Reputational Damage, and Operational Disruption. Services: Smart Contract Security Audits (integer overflows, reentrancy attacks, logic flaws), Security Code Reviews, Threat Modeling & Risk Assessment, Best Practices Guidance, and Ongoing Support. Partnering with us helps you Build Trust with Investors and Users, Minimize Risks and Maximize ROI, and Focus on Innovation. Essential for Web3, DeFi, and blockchain projects before mainnet deployment.

[Service: Customized Corporate Training and Security Awareness]
Technical security alone can't win the cyber war; most breaches begin with human error. Cyber Security Awareness Training equips your team to recognize and avoid threats; effective programs are ongoing. Benefits: Stronger Defenses, Compliance Made Easy, Smoother Operations, and Faster Recovery. Program includes Combating Phishing (Unlimited Phishing Tests, Automated Security Awareness Program, Phish Alert Button, Phishing Reply Tracking), Building a Culture of Security (Security Hints & Tips, EZXploit automated human pentesting, Social Engineering Indicators, Smart Groups), Comprehensive Protection (Automated Training Campaigns, tiered Access Levels I/II/III, a Crypto-Ransom Guarantee, Active Directory Integration), and Advanced Features (Vishing/voice-phishing Security Test, USB Drive Test, Vulnerable Browser Plugin Detection, Priority Support, AIDA AI-driven agent in beta).

[Service: Open Source Intelligence (OSINT)]
Uncovering Digital Threats: Securing Your Brand in the Virtual Age. We offer brand protection, monitoring for and eliminating counterfeit websites, digital piracy, and unauthorized brand-asset use. Dark Web Monitoring: 24/7 monitoring to detect suspicious activity, plus Data Breach Discovery. Comprehensive Dark Web & Digital Assets Protection (DDAP): Digital Legal Investigation, Insider Threat Detection, Social Media Investigation, Open and Dark Web Monitoring, and Phone Number Information. We monitor for Breached Credentials, Sensitive Documents, and Digital Asset exposure, and provide Domain and IP Intelligence, Online Asset Monitoring, forum/marketplace search, Enterprise Email Monitoring, Breached Account Data Tracking, Metadata Analysis, records monitoring, Intellectual Property Data Protection, breach intelligence alerts, and Incident Response Services.

[Service: Managed SOC]
Unmatched Security: 24/7 Protection with our SOC-as-a-Service (SOCaaS). Expert Security Team handling Managed Detection and Response (MDR), SIEM, DLP, DNS Filtering, AEP, and CASB; Advanced Threat Detection; 24/7 Threat Hunting & Response; Scalable Security Solutions; and Enhanced Endpoint Protection. Coverage: Continuous Monitoring, On-Demand MDR Services, Managed Threat Hunting, Malware Analysis, and Post-Incident Verification. Technology partners: Qualys, Sequrite, Kaspersky, Seceon, and Trellix. Three deployment models: Fully Managed SOC, Co-Managed SOC, and Hybrid SOC.

[Service: Governance, Risk, and Compliance (GRC)]
Simplify Security, Compliance, and Risk Management with our GRC-as-a-Service (GRCaaS), a cloud-based platform. A Unified Platform to manage IT & Security Risk, Digital Risk & Controls, Operational Risk, and Third-Party Risk. Key Features: Streamlined Audit Operations (automated workflows, centralized risk data), Enhanced Risk Management, Actionable Insights, a Compliance Roadmap, Automated Policy Management, Centralized Issue Management, a Scalable GRC Framework, and Regulatory Compliance Management. Supported regulations: HIPAA, HITECH, GLBA, CCPA, DFAR & CMMC, FISMA, GDPR, NYDFS, ISO 27000, NIST, and PCI DSS.

[GDPR Basics]
The General Data Protection Regulation (GDPR) is an EU regulation governing personal data of individuals in the EU/EEA. It applies to any organization, regardless of location, that offers goods or services to, or monitors, people in the EU. Obligations: lawful basis for processing, data-subject rights (access, deletion, portability), data protection by design, breach notification within 72 hours, and sometimes a Data Protection Officer. Fines up to the greater of EUR 20 million or 4% of global annual turnover. If you handle EU personal data, you likely need a GDPR readiness assessment (our Audit & Compliance and GRC services cover this).

[HIPAA Basics]
The Health Insurance Portability and Accountability Act (HIPAA) is a US regulation protecting patient health information (PHI). It applies to covered entities (healthcare providers, health plans, clearinghouses) and their business associates. It requires administrative, physical, and technical safeguards (Security Rule), rules on use and disclosure (Privacy Rule), and breach notification. Organizations handling US health data should assess HIPAA/HITECH compliance via our Audit & Compliance service (which can also address HITRUST CSF).

[PCI-DSS Basics]
The Payment Card Industry Data Security Standard (PCI-DSS) is a global standard for any organization that stores, processes, or transmits cardholder data. It covers network security, encryption, access control, monitoring, and regular security testing including vulnerability scans and penetration tests. If you accept card payments, PCI-DSS applies; our Audit & Compliance service helps you obtain your PCI DSS / ASV Attestation of Compliance, and VAPT satisfies the testing requirements.

[Getting Started and Contact]
To engage Secure Your Hacks, use the "Talk to an Expert" button or the Contact page. A typical engagement begins with a short discovery call to understand your industry, size, security posture, and goals, followed by a tailored proposal. For anything involving contracts, pricing, timelines, legal or regulatory certification decisions, or a formal assessment, we connect you with a human security expert rather than answering definitively online. Contact: 445, AIHP Horizon, Udyog Vihar Phase V, Gurugram, Haryana 122022; phone +91 8683833333; email care@secureyourhacks.com.

[FAQ]
Do I need GDPR compliance? If you offer goods/services to, or monitor, people in the EU/EEA (even from outside the EU), GDPR likely applies; start with a gap assessment. What is VAPT? Vulnerability Assessment and Penetration Testing, using our 360-degree approach. What is a vCISO? Contracted executive-level security leadership without a full-time hire. EDR vs MDR vs XDR? EDR detects on endpoints, MDR adds a 24/7 human team, XDR correlates across endpoints, network, cloud, and identity. SOC models? Fully Managed, Co-Managed, and Hybrid SOCaaS. Do you audit smart contracts? Yes: reentrancy, integer overflows, logic flaws, plus code review and threat modeling. Cost? Depends on scope; talk to a human expert for a quote. Location? Gurugram, Haryana, India.

[Policies]
Privacy: we collect info you provide, use it to operate and improve the site and communicate with you, use cookies, and honor CCPA and GDPR rights. Refund and Cancellation: the app is free to download with optional paid features; subscriptions auto-renew and are non-refundable once purchased except where legally required; EU users have a 14-day withdrawal right lost upon immediate performance. Terms: govern use of the website and services; you must be over 18; liability is limited; the service is provided "as is"; governed by the laws of Haryana, India.
`.trim();
