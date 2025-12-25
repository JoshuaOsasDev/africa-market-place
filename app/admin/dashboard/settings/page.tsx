import React from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch"
import facebookLogo from '../../../../public/admin/dashboard_images_and_icons/facebook-logo.svg'
import twitterLogo from '../../../../public/admin/dashboard_images_and_icons/twitter-logo.svg'
import linkedinLogo from '../../../../public/admin/dashboard_images_and_icons/linkedin-logo.svg'
import instagramLogo from '../../../../public/admin/dashboard_images_and_icons/instagram-logo.svg'

const page = () => {
  return (
    <div className="">
      <div className="p-5 sm:p-[30px] bg-[#FFFFFF]">
        {/* Platform Details Container */}
        <div className="col-1 w-full border border-[#E6E6E6] rounded-[10px] p-4 mb-5">
          <h1 className="text-[#424242] text-2xl font-bold mb-2">
            Platform Details
          </h1>
          <p className="text-[#595959] text-[16px] mb-4">
            Basic information about your platform
          </p>

          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-5">
              <label htmlFor="platformName" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Platform Name
                  <br />
                </span>
                <input
                  type="text"
                  name="platformName"
                  id="platformName"
                  placeholder="Your Platform Name"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3"
                />
              </label>

              <label htmlFor="platformName" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Platform URL
                  <br />
                </span>
                <input
                  type="text"
                  name="platformURL"
                  id="platformURL"
                  placeholder="http://example.com"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3"
                />
              </label>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <label htmlFor="adminEmail" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Admin Email Address
                  <br />
                </span>
                <input
                  type="email"
                  name="adminEmail"
                  id="adminEmail"
                  placeholder="admin@example.com"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3"
                />
              </label>

              <label htmlFor="supportEmail" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Support Email
                  <br />
                </span>
                <input
                  type="email"
                  name="supportEmail"
                  id="supportEmail"
                  placeholder="support@example.com"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-[8px] px-[14px] py-4"
                />
              </label>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <label htmlFor="contactInfo" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Contact Info
                  <br />
                </span>
                <input
                  type="tel"
                  name="contactInfo"
                  id="contactInfo"
                  placeholder="+1 (555) 000-0000"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3"
                />
              </label>

              <label htmlFor="timeZone" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Time Zone
                  <br />
                </span>
                <input
                  type="text"
                  name="timeZone"
                  id="timeZone"
                  placeholder="UTC (Coordinated Universal Time)"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3"
                />
              </label>
            </div>
          </form>
        </div>

        {/* Brand Settings Container */}
        <div className="col-2 w-full border border-[#E6E6E6] rounded-[10px] p-4 mb-5">
          <h1 className="text-[#424242] text-2xl font-bold mb-2">
            Brand Settings
          </h1>
          <p className="text-[#595959] text-[16px] mb-4">
            Customize your platform's brand identity
          </p>

          <form className="flex flex-col lg:flex-row gap-[15px]">
            <label htmlFor="" className="w-full">
              <span className="text-[#020E17] text-[14px]">Logo</span>
              <br />
              <input
                type="file"
                className="w-full h-[130px] mt-2 bg-[#F4F4F5] rounded-[12px] border border-dashed border-[#2E7D32] p-4"
              />
            </label>
            <label htmlFor="" className="w-full">
              <span className="text-[#020E17] text-[14px]">Logo</span>
              <br />
              <input
                type="file"
                className="w-full h-[130px] mt-2 bg-[#F4F4F5] rounded-[12px] border border-dashed border-[#2E7D32] p-4"
              />
            </label>
          </form>
        </div>

        {/* Company Address Container */}
        <div className="col-3 w-full border border-[#E6E6E6] rounded-[10px] p-4 mb-5">
            <h1 className="text-[#424242] text-2xl font-bold mb-4">Company Address</h1>

            <label htmlFor="" className="w-full text-[#020E17] text-[14px]">
                Platform Name
            </label>
            <textarea name="" id=""
            placeholder="Enter your company's full address"
            className="w-full h-[158px] mt-2 mb-4 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-[8px] px-[14px] py-4">

            </textarea>

            <h1 className="text-[#424242] text-2xl font-bold mb-2">Social Media Links</h1>
            <p className="text-[#595959] text-[16px] mb-4">Link your company social medias here</p>
            
            <form action="" className="flex flex-col gap-5">
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex gap-2 w-full">
                        <Image src={facebookLogo} alt="facebook-logo" />
                        <input type="text" placeholder="Facebook URL" className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3" />
                    </div>
                    <div className="flex gap-2 w-full">
                        <Image src={twitterLogo} alt="twitter-logo" />
                        <input type="text" placeholder="Twitter URL" className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex gap-2 w-full">
                        <Image src={linkedinLogo} alt="linkedIn-logo" />
                        <input type="text" placeholder="LinkedIn URL" className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3" />
                    </div>
                    <div className="flex gap-2 w-full">
                        <Image src={instagramLogo} alt="instagram-logo" />
                        <input type="text" placeholder="Instagram URL" className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-lg px-[14px] py-3" />
                    </div>
                </div>
                
            </form>
        </div>

        {/* System Preferences */}
        <div className="col-4 w-full border border-[#E6E6E6] rounded-[10px] p-4 mb-5">
            <h1 className="text-[#424242] text-2xl font-bold mb-2">System Preferences</h1>
            <p className="text-[#595959] text-[16px] mb-4">Configure system-wide preferences and features</p>

            <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
                <div>
                    <h1 className="text-[16px] font-medium">Maintenance Mode</h1>
                    <p className="text-[14px] text-[#6E7079]">Temporarily disable access to the platform</p>
                </div>
                <Switch />
            </div>

            <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
                <div>
                    <h1 className="text-[16px] font-medium">User Registration</h1>
                    <p className="text-[14px] text-[#6E7079]">Allow new users to register</p>
                </div>
                <Switch />
            </div>

            <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
                <div>
                    <h1 className="text-[16px] font-medium">Email Notification</h1>
                    <p className="text-[14px] text-[#6E7079]">Send email notifications for important events</p>
                </div>
                <Switch />
            </div>

            <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
                <div>
                    <h1 className="text-[16px] font-medium">Multi-Language Support</h1>
                    <p className="text-[14px] text-[#6E7079]">Enable multiple language options</p>
                </div>
                <Switch />
            </div>
        </div>

        {/* Security & Configurations */}
        <div className="col-4 w-full border border-[#E6E6E6] rounded-[10px] p-4 mb-8">
            <h1 className="text-[#424242] text-2xl font-bold mb-2">Security & Configurations</h1>
            <p className="text-[#595959] text-[16px] mb-4">Manage security settings and access controls</p>
            <h1 className="text-[16px] font-medium text-[#1A1A1A] mb-4">Password Policy</h1>
            
            <div className="flex flex-col lg:flex-row gap-5">
              <label htmlFor="platformName" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Minimum Length
                  <br />
                </span>
                <input
                  type="text"
                  name="platformName"
                  id="platformName"
                  placeholder="8"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-[8px] px-[14px] py-4"
                />
              </label>

              <label htmlFor="platformName" className="w-full">
                <span className="text-[#424242] text-[18px] font-medium">
                  Session Timeout (minutes)
                  <br />
                </span>
                <input
                  type="text"
                  name="platformURL"
                  id="platformURL"
                  placeholder="30 minutes"
                  className="w-full mt-2 text-[16px] text-[#595959] placeholder:text-[#9E9E9E] border border-[#E0E0E0] rounded-[8px] px-[14px] py-4"
                />
              </label>
            </div>

            <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4 mt-4">
                <div>
                    <h1 className="text-[16px] font-medium">Require Special Characters</h1>
                    <p className="text-[14px] text-[#6E7079]">Must contain special characters</p>
                </div>
                <Switch />
            </div>

            <div className="flex items-center justify-between border-b border-b-[#E3E3E3] py-4">
                <div>
                    <h1 className="text-[16px] font-medium">Two-factor Authentication</h1>
                    <p className="text-[14px] text-[#6E7079]">Enable 2FA for all admin accounts</p>
                </div>
                <Switch />
            </div>
            
        </div>

        <button className="text-[#EAF2EA] text-[16px] font-medium bg-[#2E7D32] rounded-[27px] py-4 px-8">Save Changes</button>

      </div>
    </div>
  );
};

export default page;
