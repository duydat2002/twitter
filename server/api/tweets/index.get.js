import { tweetTransfomer } from "../../transformers/tweet";
import { getTweets } from "../../db/tweets"

export default defineEventHandler(async (event) => {

  const { query } = getQuery(event);

  let prismaQuery = {
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true
        }
      },
      replyTo: {
        include: {
          author: true
        }
      },
    },
    orderBy: [
      {
        createAt: 'desc'
      }
    ]
  };

  if (!!query) {
    prismaQuery = {
      ...prismaQuery,
      where: {
        text: {
          contains: query,
          mode: 'insensitive',
        }
      }
    }
  }

  const tweets = await getTweets(prismaQuery);

  return {
    tweets: tweets.map(tweetTransfomer)
  }
})