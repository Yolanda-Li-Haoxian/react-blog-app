import actionType from '../actions/actionType';
const initState = [
    {author:'lhx',date:'2019.6.27',title:'gggggggg'},
    {author:'hx1',date:'2019.6.28',title:'nnnnnnnn'}
];
export default (state=initState,action)=>{
    switch (action.type) {
        case actionType.BLOG_ADD:
            return state.concat({author:'lhx2',date:'2019.6.23',title:'ccccccc'});
        default:
            return state;
    }
}