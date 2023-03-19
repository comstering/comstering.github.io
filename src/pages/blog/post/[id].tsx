import { getAllPostIds, getPostData, getSortedPostsData } from "@/lib/posts";
import { GetStaticProps } from "next";
import Head from "next/head";

const Post = ({postData}: {
    postData: {
        title: string,
        date: string,
        contentHtml: string,
    }
}) => (
    <div>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1>{postData.title}</h1>
            <div>{postData.date}</div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </div>
);

export default Post;

export const getStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
};

export const getStaticProps = async ({ params }: {
    params: {
        id: string,
    }
}) => {
    const postData = await getPostData(params.id as string);
    return {
        props: {
            postData,
        }
    }
}