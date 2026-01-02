import React from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
// import facebookLogo from '../../../../public/admin/dashboard_images_and_icons/facebook-logo.svg'
// import twitterLogo from '../../../../public/admin/dashboard_images_and_icons/twitter-logo.svg'
// import linkedinLogo from '../../../../public/admin/dashboard_images_and_icons/linkedin-logo.svg'
// import instagramLogo from '../../../../public/admin/dashboard_images_and_icons/instagram-logo.svg'

const page = () => {
  return (
    <div className="">
      <div className="bg-[#FFFFFF] p-5 sm:p-[30px]">
        {/* Platform Details Container */}
        <div className="col-1 mb-5 w-full rounded-[10px] border border-[#E6E6E6] p-4">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Platform Details
          </h1>
          <p className="mb-4 text-[16px] text-[#595959]">
            Basic information about your platform
          </p>

          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <label htmlFor="platformName" className="w-full">
                <span className="text-[18px] font-medium text-[#424242]">
                  Platform Name
                  <br />
                </span>
                <input
                  type="text"
                  name="platformName"
                  id="platformName"
                  placeholder="Your Platform Name"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </label>

              <label htmlFor="platformName" className="w-full">
                <span className="text-[18px] font-medium text-[#424242]">
                  Platform URL
                  <br />
                </span>
                <input
                  type="text"
                  name="platformURL"
                  id="platformURL"
                  placeholder="http://example.com"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </label>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <label htmlFor="adminEmail" className="w-full">
                <span className="text-[18px] font-medium text-[#424242]">
                  Admin Email Address
                  <br />
                </span>
                <input
                  type="email"
                  name="adminEmail"
                  id="adminEmail"
                  placeholder="admin@example.com"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </label>

              <label htmlFor="supportEmail" className="w-full">
                <span className="text-[18px] font-medium text-[#424242]">
                  Support Email
                  <br />
                </span>
                <input
                  type="email"
                  name="supportEmail"
                  id="supportEmail"
                  placeholder="support@example.com"
                  className="mt-2 w-full rounded-[8px] border border-[#E0E0E0] px-[14px] py-4 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </label>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <label htmlFor="contactInfo" className="w-full">
                <span className="text-[18px] font-medium text-[#424242]">
                  Contact Info
                  <br />
                </span>
                <input
                  type="tel"
                  name="contactInfo"
                  id="contactInfo"
                  placeholder="+1 (555) 000-0000"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </label>

              <label htmlFor="timeZone" className="w-full">
                <span className="text-[18px] font-medium text-[#424242]">
                  Time Zone
                  <br />
                </span>
                <input
                  type="text"
                  name="timeZone"
                  id="timeZone"
                  placeholder="UTC (Coordinated Universal Time)"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </label>
            </div>
          </form>
        </div>

        {/* Brand Settings Container */}
        <div className="col-2 mb-5 w-full rounded-[10px] border border-[#E6E6E6] p-4">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Brand Settings
          </h1>
          <p className="mb-4 text-[16px] text-[#595959]">
            Customize your platform's brand identity
          </p>

          <form className="flex flex-col gap-[15px] lg:flex-row">
            <label htmlFor="" className="w-full">
              <span className="text-[14px] text-[#020E17]">Logo</span>
              <br />
              <input
                type="file"
                className="mt-2 h-[130px] w-full rounded-[12px] border border-dashed border-[#2E7D32] bg-[#F4F4F5] p-4"
              />
            </label>
            <label htmlFor="" className="w-full">
              <span className="text-[14px] text-[#020E17]">Logo</span>
              <br />
              <input
                type="file"
                className="mt-2 h-[130px] w-full rounded-[12px] border border-dashed border-[#2E7D32] bg-[#F4F4F5] p-4"
              />
            </label>
          </form>
        </div>

        {/* Company Address Container */}
        <div className="col-3 mb-5 w-full rounded-[10px] border border-[#E6E6E6] p-4">
          <h1 className="mb-4 text-2xl font-bold text-[#424242]">
            Company Address
          </h1>

          <label htmlFor="" className="w-full text-[14px] text-[#020E17]">
            Platform Name
          </label>
          <textarea
            name=""
            id=""
            placeholder="Enter your company's full address"
            className="mt-2 mb-4 h-[158px] w-full rounded-[8px] border border-[#E0E0E0] px-[14px] py-4 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
          ></textarea>

          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Social Media Links
          </h1>
          <p className="mb-4 text-[16px] text-[#595959]">
            Link your company social medias here
          </p>

          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex w-full gap-2">
                {/* <Image src={facebookLogo} alt="facebook-logo" /> */}
                <input
                  type="text"
                  placeholder="Facebook URL"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </div>
              <div className="flex w-full gap-2">
                {/* <Image src={twitterLogo} alt="twitter-logo" /> */}
                <input
                  type="text"
                  placeholder="Twitter URL"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex w-full gap-2">
                {/* <Image src={linkedinLogo} alt="linkedIn-logo" /> */}
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </div>
              <div className="flex w-full gap-2">
                {/* <Image src={instagramLogo} alt="instagram-logo" /> */}
                <input
                  type="text"
                  placeholder="Instagram URL"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
                />
              </div>
            </div>
          </form>
        </div>

        {/* System Preferences */}
        <div className="col-4 mb-5 w-full rounded-[10px] border border-[#E6E6E6] p-4">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            System Preferences
          </h1>
          <p className="mb-4 text-[16px] text-[#595959]">
            Configure system-wide preferences and features
          </p>

          <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
            <div>
              <h1 className="text-[16px] font-medium">Maintenance Mode</h1>
              <p className="text-[14px] text-[#6E7079]">
                Temporarily disable access to the platform
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
            <div>
              <h1 className="text-[16px] font-medium">User Registration</h1>
              <p className="text-[14px] text-[#6E7079]">
                Allow new users to register
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
            <div>
              <h1 className="text-[16px] font-medium">Email Notification</h1>
              <p className="text-[14px] text-[#6E7079]">
                Send email notifications for important events
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
            <div>
              <h1 className="text-[16px] font-medium">
                Multi-Language Support
              </h1>
              <p className="text-[14px] text-[#6E7079]">
                Enable multiple language options
              </p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Security & Configurations */}
        <div className="col-4 mb-8 w-full rounded-[10px] border border-[#E6E6E6] p-4">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Security & Configurations
          </h1>
          <p className="mb-4 text-[16px] text-[#595959]">
            Manage security settings and access controls
          </p>
          <h1 className="mb-4 text-[16px] font-medium text-[#1A1A1A]">
            Password Policy
          </h1>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label htmlFor="platformName" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Minimum Length
                <br />
              </span>
              <input
                type="text"
                name="platformName"
                id="platformName"
                placeholder="8"
                className="mt-2 w-full rounded-[8px] border border-[#E0E0E0] px-[14px] py-4 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
              />
            </label>

            <label htmlFor="platformName" className="w-full">
              <span className="text-[18px] font-medium text-[#424242]">
                Session Timeout (minutes)
                <br />
              </span>
              <input
                type="text"
                name="platformURL"
                id="platformURL"
                placeholder="30 minutes"
                className="mt-2 w-full rounded-[8px] border border-[#E0E0E0] px-[14px] py-4 text-[16px] text-[#595959] placeholder:text-[#9E9E9E]"
              />
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
            <div>
              <h1 className="text-[16px] font-medium">
                Require Special Characters
              </h1>
              <p className="text-[14px] text-[#6E7079]">
                Must contain special characters
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
            <div>
              <h1 className="text-[16px] font-medium">
                Two-factor Authentication
              </h1>
              <p className="text-[14px] text-[#6E7079]">
                Enable 2FA for all admin accounts
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <button className="rounded-[27px] bg-[#2E7D32] px-8 py-4 text-[16px] font-medium text-[#EAF2EA]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default page;
