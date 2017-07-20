module.exports={
    entry: './app/app.jsx',
    output: {
        path: __dirname,
        filename: './web/js/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Main : 'app/components/Main.jsx',
            Nav : 'app/components/Navigator.jsx',
            About : 'app/components/About.jsx',
            Examples : 'app/components/Examples.jsx',
            Login: 'app/components/Login.jsx',
            Signup: 'app/components/Signup.jsx',
            PostQuestion: 'app/components/PostQuestion.jsx',
            actions:'app/actions/index.jsx',
            reducers:'app/reducers/index.jsx',
            store:'app/store/configureFile.jsx',
            constants: 'app/api/constants.jsx',
            api: 'app/api/api.jsx',
            QuestionsArea: 'app/components/QuestionsArea.jsx',
            RecentQuestions: 'app/components/RecentQuestions.jsx',
            YourQuestions: 'app/components/YourQuestions.jsx',
            BasicQuestion: 'app/components/BasicQuestion.jsx',
            Root: 'app/components/Root.jsx',
            QuestionDetails: 'app/components/QuestionDetails.jsx',
            QuestionDetailsHolder: 'app/components/QuestionDetailsHolder.jsx',
            QuestionsAreaHolder:'app/components/QuestionsAreaHolder.jsx',
            SearchQuestions: 'app/components/SearchQuestions.jsx',
            Answers: 'app/components/Answers.jsx',
            ChatRoom: 'app/components/ChatRoom.jsx',
            ChatRoomHolder: 'app/components/ChatRoomHolder.jsx',
            UsersList: 'app/components/UsersList.jsx',
            UsersListItem: 'app/components/UsersListItem.jsx',
            MessageAreas: 'app/components/MessageAreas.jsx',
            ToMessage:'app/components/ToMessage.jsx',
            FromMessage:'app/components/FromMessage.jsx'
            // loadGif: 'web/images/loading.gif'
        },
        extensions: ['','.js','.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
}