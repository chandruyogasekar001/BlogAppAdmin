import React, { useState, useEffect } from 'react';
import AdminPage from './AdminPage';
import DeleteSubheadingPage from './DeleteSubheadingPage';
import HomePage from './HomePage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Admin() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [headingTitle, setHeadingTitle] = useState('');
  const [subheadings, setSubheadings] = useState([{ subheading: '', description: '' }]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleAddGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName }),
      });
      if (response.ok) {
        fetchGroups();
        setGroupName('');
      } else {
        console.error('Failed to add group');
      }
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const handleAddHeading = async (groupId) => {
    try {
      const response = await fetch(`https://blogapp-admin-server-git-main-chandruyogasekar001s-projects.vercel.app/api/groups/${groupId}/headings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: headingTitle, subheadings }),
      });
      if (response.ok) {
        fetchGroups();
        setHeadingTitle('');
        setSubheadings([{ subheading: '', description: '' }]);
      } else {
        console.error('Failed to add heading');
      }
    } catch (error) {
      console.error('Error adding heading:', error);
    }
  };

  const handleAddSubheading = () => {
    setSubheadings([...subheadings, { subheading: '', description: '' }]);
  };

  const handleSubheadingChange = (index, field, value) => {
    const updatedSubheadings = [...subheadings];
    updatedSubheadings[index][field] = value;
    setSubheadings(updatedSubheadings);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <h1>Course Admin</h1>
      <div className="h">
      
        <div className="ad">
          <div className="boda">
           
            <h1>Admin Page</h1>
            {/* Search input field */}
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {/* Form to add a new group */}
            <form onSubmit={handleAddGroup}>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
              <button type="submit">Add Group</button>
            </form>

            {/* Display existing groups */}
            <ul>
              {filteredGroups.map((group) => (
                <li key={group._id}>
                  <h2>{group.name}</h2>
                  {/* Form to add a new heading and subheading */}
                  <form onSubmit={() => handleAddHeading(group._id)}>
                    <input
                      type="text"
                      value={headingTitle}
                      onChange={(e) => setHeadingTitle(e.target.value)}
                      placeholder="Enter heading title"
                    />
                    {/* Subheading inputs */}
                    {subheadings.map((subheading, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={subheading.subheading}
                          onChange={(e) =>
                            handleSubheadingChange(index, 'subheading', e.target.value)
                          }
                          placeholder="Enter subheading"
                        />
                        <CKEditor
                          editor={ClassicEditor}
                          data={subheading.description}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            handleSubheadingChange(index, 'description', data);
                          }}
                        />
                      </div>
                    ))}
                    <button type="button" onClick={handleAddSubheading}>
                      Add Subheading
                    </button>
                    <button type="submit">Add Heading</button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
          <div className="cl">
            <div className="bod">
              <HomePage></HomePage>
            </div>
          </div>
          <div className="ad2">
            <div className="bodd">
              <DeleteSubheadingPage />
            </div>
            <div className="bodv">
              <AdminPage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
