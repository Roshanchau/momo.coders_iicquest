const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get answer
const getAnswer = async (req, res) => {
  const { prompt } = req.query;

  try {
    const posts = await prisma.post.findMany();
    console.log(posts);

    const promptWords = new Set(prompt.toLowerCase().split(/\s+/));

    const matchingPosts = posts.filter((post) => {
      console.log("this is post", post);
      const postWords = new Set(post.title.toLowerCase().split(/\s+/));
      const sharedWords = new Set(
        [...postWords].filter((word) => promptWords.has(word))
      );
      return sharedWords.size >= 3 ? post : null;
    });
    console.log("this is matching posts", matchingPosts);

    const matchingPostComments = await Promise.all(
      matchingPosts.map(async (post) => {
        if (post) {
          const comments = await prisma.comments.findMany({
            where: {
              postId: post.id,
              userType: "THERAPIST",
            },
          });
          return { comments };
        }
        return null;
      })
    );
    console.log("this is matching posts with comments", matchingPostComments);
    res.status(200).json({ matchingPostComments });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { getAnswer };
