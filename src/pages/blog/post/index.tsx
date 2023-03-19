import Head from "next/head";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export const getStaticProps = () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
}

const Post = ({ allPostsData }: {
    allPostsData: {
    id: string,
    date: string,
    title: string
}[]
}) => (
    <>
        <Head>
            <title>Comstering Blog</title>
        </Head>
        <ul>
            { allPostsData.map(({ id, date, title }: {id: string, date: string, title: string}) => (
                <li key={id}>
                    <Link href={`post/${id}`}>
                        {title}
                    </Link>
                    <br />
                    <small>{date}</small>
                </li>
            ))}
        </ul>
    </>
);

export default Post;