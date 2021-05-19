import React from 'react'
import { Image, Table } from 'react-bootstrap'

function SkillPage() {
    return (
        <div>
            <h2>Develop</h2>
            <Table>
                <tbody>
                    <tr>
                        <th colSpan={3}><h4>Language</h4></th>
                    </tr>
                    <tr>
                        <td>python</td>
                        <td><Image src='/images/Python.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr>
                    <tr>
                        <td>JavaScript</td>
                        <td><Image src='/images/JavaScript.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={3}><h4>DataBase</h4></th>
                    </tr>
                    <tr>
                        <td>MySQL</td>
                        <td><Image src='/images/MySQL.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={3}><h4>Deploy</h4></th>
                    </tr>
                    <tr>
                        <td>GitHub</td>
                        <td><Image src='/images/GitHub.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr><tr>
                        <th colSpan={3}><h4>Sub Language</h4></th>
                    </tr>
                    <tr>
                        <td>Java</td>
                        <td><Image src='/images/Java.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr>
                    <tr>
                        <td>C</td>
                        <td><Image src='/images/C.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <h2>Flatform</h2>
            <Table>
                <tbody>
                    <tr>
                        <td>windwos</td>
                        <td><Image src='/images/Windows.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr><tr>
                        <td>Linux</td>
                        <td><Image src='/images/Linux.png' width={60} /></td>
                        <td>
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                            <i className='skill-star' />
                        </td>
                    </tr>
                </tbody>
            </Table>
            
        </div>
    )
}

export default SkillPage
