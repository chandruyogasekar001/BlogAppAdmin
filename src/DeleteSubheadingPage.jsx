import React, { useState, useEffect } from 'react';

function DeleteSubheadingPage() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedHeading, setSelectedHeading] = useState('');
  const [selectedSubheading, setSelectedSubheading] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch groups from API
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups');
      const data = await response.json();
      setGroups(data.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform delete operation here
      const response = await fetch(`https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups/${selectedGroup}/headings/${selectedHeading}/subheadings/${selectedSubheading}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessMessage('Subheading deleted successfully.');
        setSelectedSubheading('');
      } else {
        setErrorMessage('Failed to delete subheading.');
      }
    } catch (error) {
      console.error('Error deleting subheading:', error);
      setErrorMessage('Failed to delete subheading.');
    }
  };

  // Handle group deletion
  const handleGroupDelete = async () => {
    
    try {
      // Perform group delete operation here
      const response = await fetch(`https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups/${selectedGroup}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessMessage('Group deleted successfully.');
        setSelectedGroup('');
        setSelectedHeading('');
        setSelectedSubheading('');
        // Refetch groups after deletion
        fetchGroups();
      } else {
        setErrorMessage('Failed to delete group.');
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      setErrorMessage('Failed to delete group.');
    }
  };

  // Handle heading deletion
  const handleHeadingDelete = async () => {
    try {
      // Perform heading delete operation here
      const response = await fetch(`https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups/${selectedGroup}/headings/${selectedHeading}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessMessage('Heading deleted successfully.');
        setSelectedHeading('');
        setSelectedSubheading('');
      } else {
        setErrorMessage('Failed to delete heading.');
      }
    } catch (error) {
      console.error('Error deleting heading:', error);
      setErrorMessage('Failed to delete heading.');
    }
  };

  return (
    <div>
      <h1>Delete Subheading</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="group">Group:</label>
          <select id="group" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
            <option value="">Select Group</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>{group.name}</option>
            ))}
          </select>
          <button type="button" onClick={handleGroupDelete}>Delete Group</button>
        </div>
        <div>
          <label htmlFor="heading">Heading:</label>
          <select id="heading" value={selectedHeading} onChange={(e) => setSelectedHeading(e.target.value)}>
            <option value="">Select Heading</option>
            {selectedGroup &&
              groups.find((group) => group._id === selectedGroup)?.headings.map((heading) => (
                <option key={heading._id} value={heading._id}>{heading.title}</option>
              ))}
          </select>
          <button type="button" onClick={handleHeadingDelete}>Delete Heading</button>
        </div>
        <div>
          <label htmlFor="subheading">Subheading:</label>
          <select id="subheading" value={selectedSubheading} onChange={(e) => setSelectedSubheading(e.target.value)}>
            <option value="">Select Subheading</option>
            {selectedHeading &&
              groups
                .find((group) => group._id === selectedGroup)
                ?.headings.find((heading) => heading._id === selectedHeading)
                ?.subheadings.map((subheading) => (
                  <option key={subheading._id} value={subheading._id}>{subheading.subheading}</option>
                ))}
          </select>
        </div>
        <button type="submit">Delete Subheading</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default DeleteSubheadingPage;


