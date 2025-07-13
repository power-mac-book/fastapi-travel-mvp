// src/pages/CMSSectionPage.jsx
import React from "react";
import CMSSectionList from "../components/CMSSectionList";
import InfoSectionsPage from "../components/InfoSectionsPage";

const CMSSectionPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage CMS Sections</h1>
       <InfoSectionsPage/>
      <CMSSectionList />
    </div>
  );
};

export default CMSSectionPage;
