import React, { useContext, useState } from 'react'
import TableHeading from '../../components/tableHeading'
import Filter from '../../components/filter'
import Search from '../../components/search/search'
import CreateNew from '../../components/createNewButton'
// import editImage from '../../Assets/group.png'

import { Badge, Table } from 'antd'
import './jobstable.css'
import Navbar from '../../components/navbar/Navbar'
import { Images } from '../../assets/Images'
import { useEffect } from 'react'
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import NecPopUp from '../../components/NecFlow'
import { jobsTable } from '../../action/JobsTable'

const Jobs = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [jobsData, setJobsData] = useState([])
    const [isOpen, SetIsOpen] = useState(location.state?.showPopUp);

    const handleCreateNewClick = () => {
        navigate('/toolselection');
    };

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("access-token");
            console.log(accessToken, 'valueofaccesstoken')
            try {
                // const response = await axios.get('http://localhost:5000/listjobs', {
                //     headers: { "x-auth-token": accessToken }
                // });
                // console.log(response?.data?.jobs, 'fsdfsfwervwefcwe')
                // setJobsData(response?.data?.jobs)
                jobsTable((response) => {
                    console.log(response?.jobs, 'fsdfsfwervwefcwe')
                    setJobsData(response?.jobs)
                })

            } catch (error) {
                console.log(error, 'job-error')
            }
        }
        fetchData();
    }, [])

    const JobsColumns = [
        {
            title: 'Instance Name',
            dataIndex: 'name',
            width: '45%',
            render: (text, record) => record.taskName
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            render: (createdAt) => {
                if (!createdAt) {
                    return null;
                }
                const formattedDate = new Date(createdAt).toLocaleDateString();
                const formattedTime = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                    <>
                        <div>{formattedDate}, {formattedTime}</div>
                    </>
                );
            },
        },

        {
            title: 'End Time',
            dataIndex: 'endTime',
            render: (updatedAt) => {
                if (!updatedAt) {
                    return null;
                }

                const formattedDate = new Date(updatedAt).toLocaleDateString();
                const formattedTime = new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                    <>
                        <div>{formattedDate}, {formattedTime}</div>
                    </>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text) => <Badge
                className="site-badge-count-109"
                count={text}
                style={{ backgroundColor: '#52c41a' }}></Badge>
        },
        {
            dataIndex: 'detail',
        }
    ]

    return (
        <div>
            <Navbar />
            <div>
                <div className='jobinfo_table'>
                    <div className='joblistinfo_Table'>
                        <div className='connectioninfno-table'>
                            <div className='table-heading_info'>
                                <TableHeading title={"Jobs"} />
                            </div>
                            <div className='table_info_details'>
                                {/* <Filter /> */}
                                {/* <Search /> */}
                                <CreateNew onClick={handleCreateNewClick} />
                            </div>
                        </div>
                        <div className='main_connection_info_table'>
                            <Table columns={JobsColumns} dataSource={jobsData} />
                            <NecPopUp isopen={isOpen} onClose={() => { SetIsOpen(!isOpen); navigate('/jobs', { state: { showPopUp: null } }); }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs