import { countryCodes } from "@/constants/countryCodes";
import { ChevronDown } from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import PrivacySetting from "./PrivacySetting";
import SocialLinks from "./SocialLinks";

const AccountSetting = () => {
  return (
    <div className="w-[866px] min-h-[380px] rounded-md p-6 mx-auto flex flex-col gap-6">
      <h3 className="font-nunito font-semibold text-[24px] leading-[100%] text-gray-900 opacity-100">
        Account Setting
      </h3>
      {/* first name & last name*/}
      <div className="flex justify-between gap-6">
        <div className="flex flex-col w-[411px]">
          <label className="text-gray-700 text-sm font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
          />
        </div>

        <div className="flex flex-col w-[411px]">
          <label className="text-gray-700 text-sm font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
          />
        </div>
      </div>

      {/* email */}
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
        />
      </div>

      {/* phone number*/}
      <div className="flex flex-col mt-4">
        <label className="text-gray-700 text-sm font-medium mb-2">
          Phone Number
        </label>

        <div className="flex">
          {/* country*/}
          <div className="relative">
            <select
              className="h-[45px] border border-gray-300 rounded-md rounded-r-none px-3 bg-white text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 appearance-none pr-8"
              style={{ width: "100px" }}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
          </div>

          {/* phone*/}
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="h-[45px] border border-gray-300 rounded-md rounded-l-none flex-1 px-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
          />
        </div>
      </div>

      <PersonalInfo/>
      <PrivacySetting />
      <SocialLinks />
    </div>
  );
};

export default AccountSetting;
