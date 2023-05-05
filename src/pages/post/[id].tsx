import ContentLayout from "@/layouts/content";
import { getAllPostIds, getPostData, getSortedPostsData } from "@/lib/posts";

const Post = ({postData}: {
    postData: {
        title: string,
        date: string,
        contentHtml: string,
    }
}) => (
    <div>
        <ContentLayout title={postData.title} date={postData.date}>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </ContentLayout>
    </div>
);

export default Post;

export const getStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
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
    };
};
