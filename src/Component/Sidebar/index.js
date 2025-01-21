import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FaUser, FaCalendar, FaBell, FaCog, FaSignOutAlt, FaEnvelope, FaHome, FaClock, FaCalendarCheck, FaMoneyBill, FaBuilding, FaChevronDown, FaChevronUp, FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [attendanceOpen, setAttendanceOpen] = useState(false);
    const [leaveOpen, setLeaveOpen] = useState(false);
    const [financesOpen, setFinancesOpen] = useState(false);
    const [organisationOpen, setOrganisationOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [username, setUsername] = useState('User');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsername();
    }, []);

    const fetchUsername = async () => {
        const token = Cookies.get('token');
        if (!token) {
            console.error('Token not found');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/employee', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setUsername(data.employee.FullName || 'User');
            } else {
                console.error('Failed to fetch data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };


    const handleNavigation = (path) => {
        navigate(path);
    };

    const menuItems = [
        {
            title: 'Attendance',
            icon: <FaClock />,
            isOpen: attendanceOpen,
            setOpen: setAttendanceOpen,
            subItems: [
                { label: 'Attendance Logs', path: '/attendancelogs' },
                { label: 'Attendance Requests', path: '/attendancerequests' },
                { label: 'Timings', path: '/timings' },
            ],
        },
        {
            title: 'Leave',
            icon: <FaCalendarCheck />,
            isOpen: leaveOpen,
            setOpen: setLeaveOpen,
            subItems: [
                { label: 'Casual Leave', path: '/casualleave' },
                { label: 'Paid Leave', path: '/paidleave' },
                { label: 'Unpaid Leave', path: '/unpaidleave' },
            ],
        },
        {
            title: 'Finances',
            icon: <FaMoneyBill />,
            isOpen: financesOpen,
            setOpen: setFinancesOpen,
            subItems: [
                { label: 'Summary', path: '/financesummary' },
                { label: 'Salary Slip', path: '/salaryslip' },
            ],
        },
        {
            title: 'Organisation',
            icon: <FaBuilding />,
            isOpen: organisationOpen,
            setOpen: setOrganisationOpen,
            subItems: [
                { label: 'Documents', path: '/documents' },
                { label: 'Employees', path: '/employees' },
            ],
        },
    ];

    return (
        <div className="d-flex">
            <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="user-section">
                    <FaUser className="user-logo" />
                    {isExpanded && <h4 className="username">{username}</h4>}
                </div>

                {isExpanded && <p className="user-role">SOFTWARE ENGINEER</p>}

                {menuItems.map((item, index) => (
                    <div key={index}>
                        <div
                            className="sidebar-item"
                            onClick={() => item.setOpen(!item.isOpen)}
                        >
                            {item.icon}
                            {isExpanded && <span>{item.title}</span>}
                            {item.isOpen ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />}
                        </div>
                        {item.isOpen && isExpanded && (
                            <ul className="dropdown-content">
                                {item.subItems.map((subItem, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className="sidebar-subitem"
                                        onClick={() => handleNavigation(subItem.path)}
                                    >
                                        {subItem.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            <div className={`main-content w-100 ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <Navbar variant="light" expand="lg" className='nv'>
                    <Container fluid className="d-flex justify-content-between align-items-center">
                        <Nav className="d-flex align-items-center">
                            <Nav.Link onClick={() => setIsExpanded(!isExpanded)} className="toggle-icon">
                                <FaBars size={25} />
                            </Nav.Link>
                        </Nav>

                        <Navbar.Collapse>
                            <Nav className="d-flex align-items-center">
                                <Nav.Link href="#">
                                    <FaBell size={20} />
                                </Nav.Link>
                                <Nav.Link href="#">
                                    <FaEnvelope size={20} />
                                </Nav.Link>
                            </Nav>

                            <Nav className="d-flex justify-content-center flex-grow-1">
                                <form className="d-flex w-75">
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                </form>
                            </Nav>

                            <Nav className="d-flex align-items-center">
                                <Nav.Link>
                                   <Link to="/calendar" className='lk'><FaCalendar size={20} /></Link> 
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/home" className='lk'> <FaHome size={20} /></Link>
                                </Nav.Link>
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ backgroundColor: "#fff" }}>
                                        <FaUser /> {username}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleNavigation('/profile')}>
                                            <FaCog /> Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>
                                            <FaSignOutAlt /> Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
};

export default Sidebar;
