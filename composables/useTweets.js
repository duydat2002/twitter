export default () => {
  const postTweet = (formData) => {
    const form = new FormData();

    form.append("text", formData.text);
    form.append("replyTo", formData.replyTo);

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append("media_file_" + index, mediaFile);
    });

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    });
  };

  const getTweets = (params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi("/api/tweets", {
          method: "GET",
          params
        })

        resolve(response);
      } catch (error) {
        reject(error);
      }
    })
  }

  const getTweetById = (tweetId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`, {
          method: "GET",
        })

        resolve(response);
      } catch (error) {
        reject(error);
      }
    })
  }


  const usePostTweetModal = () => useState('post_tweet_nodal', () => false);
  const useReplyTweet = () => useState('reply_tweet', () => null);

  const setReplyTweet = (tweet) => {
    const replyTweet = useReplyTweet();
    replyTweet.value = tweet;
  }

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = false;
  }
 
  const openPostTweetModal = (tweet = null) => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = true;

    setReplyTweet(tweet);
  }

  return {
    postTweet,
    getTweets,
    getTweetById,
    closePostTweetModal,
    usePostTweetModal,
    openPostTweetModal,
    useReplyTweet
  };
};
