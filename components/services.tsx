import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Search,
  ClipboardList,
  Monitor,
  FileCode,
  GraduationCap,
  Globe,
  Activity,
  BarChart3,
} from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    slug: "vciso",
    title: "VIRTUAL CISO (VCISO)",
    description:
      "As a leading cybersecurity company, we offer a Virtual CISO (VCISO) Program that aids executives and security teams in protecting information assets and contributing to business operations. Our services include certified virtual CISOs and dedicated expert support to integrate with your team, offering savings in time and resources spent on hiring security personnel.",
  },
  {
    icon: Users,
    slug: "consultancy",
    title: "Cyber Security Consultancy",
    description:
      "Our dedicated team of cyber security consultants is committed to providing expert guidance and support to help your business navigate the complex landscape of digital threats. We'll collaborate closely with your organization to develop effective strategies and implement proactive measures to identify and mitigate potential risks.",
  },
  {
    icon: Search,
    slug: "vapt",
    title: "Vulnerability Assessment Penetration Testing (VAPT)",
    description:
      "With our VAPT services, we conduct in-depth assessments to identify vulnerabilities within your network infrastructure, applications, and systems. Through rigorous penetration testing, we aim to simulate real-world attacks to identify weaknesses and potential exploits that could compromise your data security.",
  },
  {
    icon: ClipboardList,
    slug: "audit-compliance",
    title: "Audit & Compliances",
    description:
      "At Secure Your Hacks, we understand the importance of complying with industry-specific regulations and standards. Our compliance experts will assess your current security policies and procedures, identify any gaps, and guide you through achieving compliance with applicable regulations such as GDPR, HIPAA, or PCI-DSS.",
  },
  {
    icon: Monitor,
    slug: "edr-mdr-xdr",
    title: "EDR, MDR, XDR",
    description:
      "Employing Endpoint Detection and Response (EDR), Managed Detection and Response (MDR), and Extended Detection and Response (XDR) solutions, we offer comprehensive threat detection and incident response capabilities. Our advanced technologies and experienced analysts are dedicated to promptly identifying and mitigating potential security breaches.",
  },
  {
    icon: FileCode,
    slug: "smart-contracts",
    title: "Smart Contracts",
    description:
      "Our team of experts helps you navigate the world of smart contracts, ensuring that your transactions and agreements are secure and transparent. We offer comprehensive smart contract auditing and advice for blockchain-based projects, reducing the risk of vulnerabilities and potential attacks.",
  },
  {
    icon: GraduationCap,
    slug: "training",
    title: "Customized Training - Corporate IT Training Solutions",
    description:
      "We offer customized training programs specifically designed to equip your employees with the necessary knowledge and skills to mitigate cyber threats. Our engaging and interactive training sessions cover various topics, including best practices for data protection, email security, and safe internet usage.",
  },
  {
    icon: Globe,
    slug: "osint",
    title: "OSINT",
    description:
      "Open Source Intelligence (OSINT) is crucial in understanding and combating potential digital threats. Our specialized OSINT services provide valuable insights into your online presence, identifying any vulnerabilities or threats.",
  },
  {
    icon: Activity,
    slug: "managed-soc",
    title: "Managed SOC",
    description:
      "Secure Your Hacks offers SOC services that allow you to outsource your security operations. Our certified risk professionals focus on Managed Detection and Response (MDR), SIEM, DLP, DNS Filtering, AEP, and CASB managed services, providing you with the benefits of a SOC without the need for extensive time and resource investments.",
  },
  {
    icon: BarChart3,
    slug: "grc",
    title: "GRC",
    description:
      "Our GRC service helps businesses with Governance, Risk Management, and Compliance (GRC) management. We assist with various areas such as IT & Security Risk Management, Digital Risk & Controls, Enterprise & Operational Risk, Audit Management, Third-Party Risk Management, Policy Management, Data Discovery, Incident Management, and Business Continuity.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0f0f24] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-white/50 uppercase tracking-widest mb-2 font-medium">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Explore Our{" "}
            <span className="text-[#1a6bff]">Wide Range of Services</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className="group block bg-white rounded-xl p-6 hover:shadow-2xl hover:shadow-[#1a6bff]/10 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#1a6bff]/20"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-14 h-14 bg-[#1a6bff]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1a6bff]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#1a6bff]" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-base font-bold text-[#1a6bff] mb-3 leading-snug">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
