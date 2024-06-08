import React, { useState, useEffect } from 'react';

function AdminPage() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/groups');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ flex: 1, overflow: 'scroll', height: '100vh' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Heading Title</th>
            <th>Subheading</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((group) => (
            <React.Fragment key={group._id}>
              {group.headings.map((heading) => (
                <React.Fragment key={heading._id}>
                  {heading.subheadings.map((subheading, index) => (
                    <tr key={`${group._id}-${heading._id}-${index}`}>
                      {index === 0 && (
                        <React.Fragment>
                          <td rowSpan={heading.subheadings.length}>{group.name}</td>
                          <td rowSpan={heading.subheadings.length}>{heading.title}</td>
                        </React.Fragment>
                      )}
                      <td>{subheading.subheading}</td>
                      <td>{subheading.description}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
