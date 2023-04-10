import React, { useState } from 'react';

import Layout from '@/components/postlogin/Layouts/Layout';

import SearchBar from './searchbar/searchbar';
import BillingSettings from './settings/billingSettings';
import General from './settings/generalSettings';
import Password from './settings/passwordSettings';
import Plan from './settings/planSettings';
import TeamMember from './settings/teamMembersSettings';

const SettingPage = () => {
  const [showGeneral, setShowGeneral] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [showPlan, setshowPlan] = useState(false);
  const [showBilling, setshowBilling] = useState(false);
  const [showTeamMembers, setshowTeamMembers] = useState(false);
  const handleGeneral = (e) => {
    e.preventDefault();
    setShowGeneral(true);
    setshowPassword(false);
    setshowPlan(false);
    setshowBilling(false);
    setshowTeamMembers(false);
  };
  const handlePlan = (e) => {
    e.preventDefault();
    setShowGeneral(false);
    setshowPassword(false);
    setshowPlan(true);
    setshowBilling(false);
    setshowTeamMembers(false);
  };
  const handleBilling = (e) => {
    e.preventDefault();
    setShowGeneral(false);
    setshowPassword(false);
    setshowPlan(false);
    setshowBilling(true);
    setshowTeamMembers(false);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setShowGeneral(false);
    setshowPassword(true);
    setshowPlan(false);
    setshowBilling(false);
    setshowTeamMembers(false);
  };
  const handleTeamMembers = (e) => {
    e.preventDefault();
    setShowGeneral(false);
    setshowPassword(false);
    setshowPlan(false);
    setshowBilling(false);
    setshowTeamMembers(true);
  };
  return (
    <Layout>
      <div className="ml-10 mt-10 w-11/12 flex flex-col items-center">
        <SearchBar />
      </div>
      <div className="w-full ml-10">
      <h1 className="text-2xl mt-14">Settings</h1>
        <div className="w-full flex flex-row space-x-14 mt-7 border-b-2 border-gray-800">
          <a
            href="#"
            className="no-underline box-border h-10 w-14 border-b-4 box-decoration-clone hover:no-underline p-0"
            onClick={handleGeneral}
          >
            General
          </a>
          <a href="#" onClick={handlePassword}>
            Password
          </a>

          <a href="#" onClick={handlePlan}>
            Plan
          </a>

          <a href="#" onClick={handleBilling}>
            Billings
          </a>

          <a href="#" onClick={handleTeamMembers}>
            Team Members
          </a>
        </div>
        {showGeneral && <General />}
        {showPassword && <Password />}
        {showPlan && <Plan />}
        {showBilling && <BillingSettings />}
        {showTeamMembers && <TeamMember />}
      </div>
    </Layout>
  );
};

export default SettingPage;
