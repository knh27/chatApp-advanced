

// export const getOtherMember=(members, userId)=>{
//     const otherMember=members.find((memberId)=>memberId._id.toString() !==userId.toString()) 
//     return otherMember;
// }

export const getOtherMember = (members, userId) => {
    return members.find(member => member._id.toString() !== userId.toString());
};
