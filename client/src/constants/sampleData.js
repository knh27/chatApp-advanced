export const sampleChats=[
    {
        avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s",, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s"],
        name:"AbduL",
        _id:"1",
        groupChat:false,
        members:["1", "2"]
    },
    {
        avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s"],
        name:"Ajmal",
        _id:"2",
        groupChat:false,
        members:["1", "2"] 
    },
    {
        avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s"],
        name:"Md",
        _id:"3",
        groupChat:false,
        members:["1", "2"]
    },
    {
        avatar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s"],
        name:"Ahmad",
        _id:"4",
        groupChat:false,
        members:["1", "2"]
    }
]

export const sampleUsers=[
    {
        avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s",
        name:"Hamid",
        _id:1
    },

    {
        avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s",
        name:"Jahan",
        _id:2
    },

    {
        avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s",
        name:"Ajmal",
        _id:3
    },
]


export const sampleNotifications=[
    {
        sender:{
            avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s",
            name:"Rashid"
        },
        _id:'1'
    },
    {
        sender:{
            avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s",
            name:"Rashid"
        },
        _id:'2'
    }
]



export const sampleMessage=[
    {
        attachments:[
            {
                public_id:"abc",
                url:"https://www.w3schools.com/howto/img_avatar.png"

            }
        ],
        content:"this is a sample message",
        _id:"abcd",
        sender:{
            _id:"abcde",
            name:"Bilal"
        },
        chat:"chatId",
        createAt:"2024-11-04T18:30:00.00Z"
    },
    {
        content:"this is a sample message 2",
        _id:"abce",
        sender:{
            _id:"abcdf",
            name:"Allah"
        },
        chat:"chatId",
        createAt:"2023-02-12T10:41:30.630Z"
    }
]


export const dashboardData={
    users:[
        {
            name:"Abdul",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"1",
            username:"abdulla",
            friends:20,
            groups:5
        },
        {
            name:"Hamid",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"2",
            username:"hamid",
            friends:20,
            groups:5
        },
        {
            name:"Makaram",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"3",
            username:"makaram",
            friends:20,
            groups:5
        },
    ],

    chats:[
        {
            name:"Abbas",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"1",
            groupChat:true,
            members:[{
                _id:"1",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }, {
                _id:"2",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"Abbas",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }
        },
        {
            name:"Naqvi",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"2",
            groupChat:false,
            members:[{
                _id:"1",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }, {
                _id:"2",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"Naqvi",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }
        },
        {
            name:"Haider",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"3",
            groupChat:true,
            members:[{
                _id:"1",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }, {
                _id:"2",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"Abbas",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }
        },
    ],

    messages:[
        {
            attachments:[{
                public_id:"ab",
                url:"https://www.w3schools.com/howto/img_avatar.png"
            }],
            content:"hey allah gaar mara",
            _id:"abcd",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Soaib",
            },
            chat:"abcde",
            groupChat:true,
            createdAt:"2024-01-12T10:41:30.630Z"
        },
        {
            attachments:[{
                public_id:"ab",
                url:"https://www.w3schools.com/howto/img_avatar.png"
            },
            {
                public_id:"ac",
                url:"https://www.w3schools.com/howto/img_avatar.png"
            }],
            content:"hey allah gaar mara",
            _id:"abcd",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Soaib",
            },
            chat:"abcde",
            groupChat:true,
            createdAt:"2024-01-12T10:41:30.630Z"
        },
        {
            attachments:[{
                public_id:"ab",
                url:"https://www.w3schools.com/howto/img_avatar.png"
            }],
            content:"hey allah gaar mara",
            _id:"abcd",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Soaib",
            },
            groupChat:false,
            chat:"abcde",
            createdAt:"2024-01-12T10:41:30.630Z"
        },
        
    ]
}


