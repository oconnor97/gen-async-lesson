const api = new API();

// This is a utility function to print individual posts to the console
const printPostRow = (post) => {
    // console.log(`Left By: ${post.owner.firstName} ${post.owner.lastName}`);
    // console.log(`Message: ${post.text}`);
    document.getElementById('postsCtn').innerHTML += (`<b>Left By:</b>  ${post.owner.firstName} ${post.owner.lastName} <br><b> Message:</b>  ${post.text} <br> ------------- <br>`);


};

const start = async() => {
    try {
        await api.getInitialPosts();

        const currentPost = await api.getPosts();
        currentPost.forEach((post) => {
            printPostRow(post)

        });
    } catch (error) {
        console.log(error);

    }


    // code goes below to call the api getInitialPosts method then call
    // api.getPosts() inside the callback of the successful aforementioned
    // call then if successful log '-----------------', loop thru the resolved
    // posts results and run printPostRow(post) for each one
    // log another '-----------------' after the loop and catch any errors



};

const addANewPost = async() => {

    const firstInput = prompt('What is your first name?');
    const lastInput = prompt('What is your last name?');
    const postInput = prompt('What would you like to post?');
    if (firstInput && lastInput && postInput) {
        // code goes below for calling the .addPost() method on our api
        // instance passing in the following data as an argument:
        /*  
          {
            owner: {
              firstName: firstInput,
              lastName: lastInput,
            },
            text: postInput,
          }
        */
        // log the newPost, then call
        // api.getPosts() inside the callback of the successful aforementioned
        // call then if successful log '-----------------', loop thru the resolved
        // posts results and run printPostRow(post) for each one
        // log another '-----------------' after the loop and catch any errors
        try {

            await api.addPost({
                owner: {
                    firstName: firstInput,
                    lastName: lastInput,
                },
                text: postInput,
            })
            const newPost = await api.getPosts();


            document.getElementById('postsCtn').innerHTML = '';

            newPost.forEach((post) => {
                printPostRow(post)
            });
        } catch (error) {
            console.log(error)
        }




    }
};

const deleteAPost = async() => {


    // code goes below to call the api delettePost method then call
    // api.getPosts() inside the callback of the successful aforementioned
    // call then if successful log '-----------------', loop thru the resolved
    // posts results and run printPostRow(post) for each one
    // log another '-----------------' after the loop and catch any errors
    try {

        const deletion = await api.deletePost()

        const postToBeDeleted = await api.getPosts()
        document.getElementById('postsCtn').innerHTML = '';
        postToBeDeleted.forEach((post) => {

            printPostRow(post)
            console.log(api._posts)
        });

    } catch (error) {
        console.log(error)
        console.log('----------')
    }


};

// NO NEED TO CHANGE ANYTHING BELOW BUT NO HARM IN GOOGLING SOME OF IT
// Don't worry about the statements below, we will go more into how these work on Monday
// These trigger the functions when the button is clicked in the HTML
document
    .querySelector('span:nth-child(1)')
    .addEventListener('click', addANewPost);
document
    .querySelector('span:nth-child(2)')
    .addEventListener('click', deleteAPost);

// starting our app
start();