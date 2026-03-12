"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  useAdminCurrency,
  useAdminSettings,
} from "@/lib/hooks/adminDashboardApi/useAdmin";
import { useCreateSlider } from "@/lib/hooks/userDashboard/useUser";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
// import facebookLogo from '../../../../public/admin/dashboard_images_and_icons/facebook-logo.svg'
// import twitterLogo from '../../../../public/admin/dashboard_images_and_icons/twitter-logo.svg'
// import linkedinLogo from '../../../../public/admin/dashboard_images_and_icons/linkedin-logo.svg'
// import instagramLogo from '../../../../public/admin/dashboard_images_and_icons/instagram-logo.svg'

type SliderType = {
  productId: string;
  productName: string;
  webImageUrl: string;
  mobileImageUrl: string;
};
const SettingsPage = () => {
  const [sliderData, setSliderData] = useState<SliderType>({
    productId: "",
    productName: "",
    webImageUrl: "",
    mobileImageUrl: "",
  });

  const restoreScroll = () => {
    document.body.style.overflow = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSliderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setSliderData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const { adminSettings } = useAdminSettings();
  const { adminCurrency } = useAdminCurrency();
  const { mutate: createSlider, isPending } = useCreateSlider();
  //   export const getAdminSettings = async () => {
  //   const { data } = await http.get(`/admin/settings/settings`);
  //   return data;
  // };
  // console.log(adminSettings, "settings data");
  // console.log(adminCurrency, "currency data");
  const handleSliderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSlider(sliderData, {
      onSuccess: () => {
        setSliderData({
          productId: "",
          productName: "",
          webImageUrl: "",
          mobileImageUrl: "",
        });
      },
    });
  };
  return (
    <div className="">
      <div className="bg-[#FFFFFF] p-5 sm:p-7.5">
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

        {/* Image Slider Settings */}
        <div className="mb-8 w-full rounded-[10px] border border-[#E6E6E6] p-4">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Homepage Image Slider
          </h1>

          <p className="mb-4 text-[16px] text-[#595959]">
            Upload images that will appear on the homepage slider
          </p>

          <form onSubmit={handleSliderSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <label className="w-full">
                <span className="text-[16px] font-medium">Product ID</span>
                <input
                  type="text"
                  name="productId"
                  value={sliderData.productId}
                  onChange={handleChange}
                  placeholder="Enter Product ID"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3"
                />
              </label>

              <label className="w-full">
                <span className="text-[16px] font-medium">
                  Product Name(Slug)
                </span>
                <input
                  type="text"
                  name="productName"
                  value={sliderData.productName}
                  onChange={handleChange}
                  placeholder="Laptop"
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3"
                />
              </label>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Web Image */}
              <div className="w-full">
                <span className="mb-2 block text-[16px] font-medium text-[#424242]">
                  Web Slider Image
                </span>

                <CldUploadWidget
                  uploadPreset="africamarketplace"
                  onSuccess={(result: any) => {
                    restoreScroll();
                    const imageUrl = result.info.secure_url;

                    setSliderData((prev) => ({
                      ...prev,
                      webImageUrl: imageUrl,
                    }));
                  }}
                  options={{
                    showPoweredBy: false,
                    multiple: false,
                    clientAllowedFormats: ["png", "jpg", "jpeg"],
                    folder: "slider-image",
                    maxFileSize: 1 * 1024 * 1024,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="relative flex h-37.5 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#2E7D32] bg-[#F9FAFB] transition hover:bg-[#F1F5F9]"
                    >
                      {sliderData.webImageUrl ? (
                        <Image
                          src={sliderData.webImageUrl}
                          alt="web slider"
                          fill
                          className="h-full w-full rounded-xl object-cover"
                        />
                      ) : (
                        <>
                          <FiCamera className="text-3xl text-[#2E7D32]" />
                          <p className="text-sm text-gray-500">
                            Click to upload web slider
                          </p>
                        </>
                      )}
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              {/* Mobile Image */}
              <div className="w-full">
                <span className="mb-2 block text-[16px] font-medium text-[#424242]">
                  Mobile Slider Image
                </span>

                <CldUploadWidget
                  uploadPreset="africamarketplace"
                  onSuccess={(result: any) => {
                    restoreScroll();
                    const imageUrl = result.info.secure_url;

                    setSliderData((prev) => ({
                      ...prev,
                      mobileImageUrl: imageUrl,
                    }));
                  }}
                  options={{
                    showPoweredBy: false,
                    multiple: false,
                    clientAllowedFormats: ["png", "jpg", "jpeg"],
                    folder: "slider-image",
                    maxFileSize: 1 * 1024 * 1024,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="relative flex h-[150px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#2E7D32] bg-[#F9FAFB] transition hover:bg-[#F1F5F9]"
                    >
                      {sliderData.mobileImageUrl ? (
                        <Image
                          src={sliderData.mobileImageUrl}
                          alt="mobile slider"
                          fill
                          className="rounded-xl object-cover"
                        />
                      ) : (
                        <>
                          <FiCamera className="text-3xl text-[#2E7D32]" />
                          <p className="text-sm text-gray-500">
                            Click to upload mobile slider
                          </p>
                        </>
                      )}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="mt-4 w-fit cursor-pointer rounded-[27px] bg-[#2E7D32] px-6 py-3 text-white disabled:cursor-not-allowed"
              >
                Upload Slider
              </Button>
            </div>
          </form>
        </div>

        <button className="rounded-[27px] bg-[#2E7D32] px-8 py-4 text-[16px] font-medium text-[#EAF2EA]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
