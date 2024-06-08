import React, { useState, useEffect } from 'react';

function HeadingsPage() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGroups(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching groups:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    setFilteredGroups(groups.filter(group => group.name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [groups, searchQuery]);

  const handleGroupClick = async (groupId) => {
    setSelectedGroupId(groupId);
    try {
      setLoading(true);
      const response = await fetch(`https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups/${groupId}/headings`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      const { data } = responseData;
      setHeadings(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching headings:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleTitleChange = (headingIndex, value) => {
    const updatedHeadings = [...headings];
    updatedHeadings[headingIndex] = { ...updatedHeadings[headingIndex], title: value };
    setHeadings(updatedHeadings);
  };

  const handleSubheadingChange = (headingIndex, subheadingIndex, value) => {
    const updatedHeadings = [...headings];
    updatedHeadings[headingIndex].subheadings[subheadingIndex] = {
      ...updatedHeadings[headingIndex].subheadings[subheadingIndex],
      subheading: value,
    };
    setHeadings(updatedHeadings);
  };

  const handleDescriptionChange = (headingIndex, subheadingIndex, value) => {
    const updatedHeadings = [...headings];
    updatedHeadings[headingIndex].subheadings[subheadingIndex] = {
      ...updatedHeadings[headingIndex].subheadings[subheadingIndex],
      description: value,
    };
    setHeadings(updatedHeadings);
  };

  const handleSaveChanges = async () => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(headings),
      };
      const response = await fetch(`https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups/${selectedGroupId}/headings`, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      console.log('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      setError('Failed to save changes. Please try again.');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="app">
      <h1>Teck stacks</h1>
      <input
        type="text"
        placeholder="Search groups..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul className="list">
          {filteredGroups.map((group) => (
            <li key={group._id}>
             <span onClick={() => handleGroupClick(group._id)} className={selectedGroupId === group._id ? 'active' : ''}>
                {group.name}
              </span>
            </li>
          ))}
        </ul>
      )}
      {selectedGroupId && (
        <div className="edt">
          <h2>Headings</h2>
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              {headings.map((heading, headingIndex) => (
                <div key={heading._id}>
                  <input
                    type="text"
                    value={heading.title}
                    onChange={(e) => handleTitleChange(headingIndex, e.target.value)}
                  />
                  {heading.subheadings.map((subheading, subheadingIndex) => (
                    <div key={subheading._id}>
                      <input
                        type="text"
                        value={subheading.subheading}
                        onChange={(e) => handleSubheadingChange(headingIndex, subheadingIndex, e.target.value)}
                      />
                      <textarea
                        value={subheading.description}
                        onChange={(e) => handleDescriptionChange(headingIndex, subheadingIndex, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ))}
                            <button onClick={handleSaveChanges}>Save Changes</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default HeadingsPage;
