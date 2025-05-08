import React from "react";
import { Github, Linkedin, Twitter, FileText } from "lucide-react";
import BentoBox, { colors, ColorName } from "./BentoBox";

interface ProfileBoxProps {
  borderColorName?: ColorName;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ borderColorName }) => {
  return (
    <BentoBox
      className="p-6 h-full md:col-span-2"
      style={{ backgroundColor: colors.lightPurple }}
      borderColorName={borderColorName}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src="/assets/img/prof_pic.jpg"
              alt="Kabir Jolly"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <div>
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: colors.navy }}
              >
                Kabir Jolly
              </h1>
              <p className="text-sm" style={{ color: colors.navy }}>
                Master's student at Stanford studying AI and HCI
              </p>
            </div>
            <div className="flex space-x-3">
              <a
                href="https://github.com/kabir-jolly"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                style={{ color: colors.slate }}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/kabirjolly"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                style={{ color: colors.slate }}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com/kabirjolly_"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                style={{ color: colors.slate }}
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={18} />
              </a>
              <a
                href="/assets/files/kabirjolly_resume_1-2-25.pdf"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                style={{ color: colors.slate }}
                aria-label="Resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm mb-3" style={{ color: colors.navy }}>
            I'm currently thinking about how best to design interfaces for AI.
          </p>
          <p className="text-sm mb-3" style={{ color: colors.navy }}>
            Alongside school, I'm currently building internal tools at{" "}
            <a
              href="https://www.pear.vc"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pear VC
            </a>{" "}
            and am a Course Assistant for Stanford's{" "}
            <a
              href="https://web.stanford.edu/class/cs194/"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              CS Senior Capstone Project
            </a>{" "}
            class. Previously, I was Head of Product and Engineering at the{" "}
            <a
              href="https://www.dormroomfund.com"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Dorm Room Fund
            </a>
            , built software at{" "}
            <a
              href="https://www.fieldguide.io"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fieldguide
            </a>
            ,{" "}
            <a
              href="https://www.getzeal.co"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zeal
            </a>
            , and{" "}
            <a
              href="https://www.valarlabs.com"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Valar Labs
            </a>
            , and worked on interpretable AI research at the Stanford Medical
            Center.
          </p>
          <p className="text-sm mb-3" style={{ color: colors.navy }}>
            I am also a{" "}
            <a
              href="https://neo.com/scholars"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Neo Scholar
            </a>{" "}
            and a Fellow at{" "}
            <a
              href="https://stvp.stanford.edu/alp/"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Accel
            </a>
            ,{" "}
            <a
              href="https://www.8vc.com/fellows/kabir-jolly"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              8VC
            </a>
            , and{" "}
            <a
              href="https://www.pear.vc/garage"
              className="underline hover:no-underline"
              style={{ color: colors.navy, fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pear
            </a>
            .
          </p>
        </div>
      </div>
    </BentoBox>
  );
};

export default ProfileBox;
