// Inside Admin component

// Import the newly created components
import UpdateProfile from './UpdateProfile';
import AddClass from './AddClass';
import ManageClass from './ManageClass';
// Import other components for other cases

// Render content based on activeLink
const renderContent = () => {
  switch (activeLink) {
    case 'Update':
      return <UpdateProfile admindetails={admindetails} handleProfileChange={handleProfileChange} handileAvatar={handileAvatar} updateadmin={updateadmin} />;
    case 'Add Course':
      return <AddClass course={course} setCourse={setCourse} addcourse={addcourse} />;
    case 'Manage Course':
      return <ManageClass coursedata={coursedata} handleLinkClick={handleLinkClick} deletecourse={deletecourse} />;
    // Render other components for other cases
  }
};

// Render the content
return (
  <>
    {/* Your existing code */}
    <div id='change_section'>
      {renderContent()}
    </div>
    {/* Your existing code */}
  </>
);
