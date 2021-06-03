import React from 'react'
import { Container, Image, Table } from 'react-bootstrap'
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons'

function SkillPage() {
    return (
        <div>
            <h2>Develop</h2>
            <Container>
            <Table className='text-center'>
                <tbody>
                    <tr className='text-left'>
                        <th colSpan={3}><h4>Language</h4></th>
                    </tr>
                    <tr>
                        <td>python</td>
                        <td><Image src='/images/Python.png' width={60} /></td>
                        <td>
                            <StarFill />
                            <StarFill />
                            <StarFill />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                    <tr>
                        <td>JavaScript</td>
                        <td><Image src='/images/JavaScript.png' width={60} /></td>
                        <td >
                            <StarFill />
                            <StarFill />
                            <StarHalf />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                    <tr className='text-left'>
                        <th colSpan={3}><h4>DataBase</h4></th>
                    </tr>
                    <tr>
                        <td>MySQL</td>
                        <td><Image src='/images/MySQL.png' width={60} /></td>
                        <td>
                            <StarFill />
                            <StarFill />
                            <StarHalf />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                    <tr className='text-left'>
                        <th colSpan={3}><h4>Deploy</h4></th>
                    </tr>
                    <tr>
                        <td>GitHub</td>
                        <td><Image src='/images/GitHub.png' width={60} /></td>
                        <td>
                            <StarFill />
                            <StarFill />
                            <StarHalf />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                    <tr className='text-left'>
                        <th colSpan={3}><h4>Sub Language</h4></th>
                    </tr>
                    <tr>
                        <td>Java</td>
                        <td><Image src='/images/Java.png' width={60} /></td>
                        <td>
                            <StarFill />
                            <StarFill />
                            <StarHalf />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                    <tr>
                        <td>C</td>
                        <td><Image src='/images/C.png' width={60} /></td>
                        <td>
                            <StarFill />
                            <StarFill />
                            <StarHalf />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Container>
            <h2>Flatform</h2>
            <Container>
            <Table className='text-center'>
                <tbody>
                    <tr>
                        <td>windwos</td>
                        <td><Image src='/images/Windows.png' width={60} /></td>
                        <td>
                            <StarFill />
                            <StarFill />
                            <StarFill />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                    <tr>
                        <td>Linux</td>
                        <td><Image src='/images/Linux.png' width={60} /></td>
                        <td>
                            <StarFill />
                            <StarFill />
                            <StarHalf />
                            <Star />
                            <Star />
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Container>
        </div>
    )
}

export default SkillPage
