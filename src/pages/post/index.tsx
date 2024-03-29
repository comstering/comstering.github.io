import PostLayout from "@/layouts/post";
import { getSortedPostsData } from "@/lib/posts";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps = () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
};

const Post = ({ allPostsData }: {
    allPostsData: {
        id: string;
        date: string;
        title: string;
    }[];
}) => (
    <div>
        <PostLayout>
        <Head>
            <title>Comstering Blog</title>
        </Head>
        <section>
            <h2>Blog</h2>
            <ul>
                {allPostsData.map(({ id, date, title }) => (
                        <li key={id}>
                            <Link href={`post/${id}`}>
                                {title}
                                <br />
                                {id}
                                <br />
                                {date}
                            </Link>
                        </li>
                ))}
            </ul>
        </section>
        </PostLayout>
    </div>
);

export default Post;
