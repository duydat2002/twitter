import { mediaFileTranformer } from "./mediaFiles"
import { userTransformer } from "./user"
import human from "human-time"

export const tweetTransfomer = (tweet) => {
  const postedAtHuman = human(new Date(tweet.createAt.toString()));

  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: tweet.mediaFiles ? tweet.mediaFiles.map(mediaFileTranformer) : [],
    author: !!tweet.author ? userTransformer(tweet.author) : null,
    replies: !!tweet.replies ? tweet.replies.map(tweetTransfomer) : [],
    replyTo: !!tweet.replyTo ? tweetTransfomer(tweet.replyTo) : null,
    repliesCount: !!tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: postedAtHuman,
  }
}