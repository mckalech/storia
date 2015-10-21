var React = require('React'),
	$ = require('jQuery'),
	Post = require('./post');

var Feed = React.createClass({
	getInitialState: function(){
		return {
			loaded: false
		};
	},
	componentDidMount: function(){
		var that = this;
		$.ajax({
			url:'https://storia.me/api/feed/content',
			xhrFields: {
				withCredentials: true
			},
			success:function(data){
				that.setState({
					loaded:true,
					posts:data.items
				});
			}
		});
	},
	render : function(){
		if(this.state.loaded){
			var feed = [];
			this.state.posts.forEach(function(item, i, ar){
				feed.push(
					<Post data={item.objectPreview} key={item.id} />
				)
			});
			return (
				<div className="row">
					<div className="b-feed col-md-5">
						{feed}
					</div>
				</div>
			);
		}else{
			return(
				<span>loading</span>
			)
		}
	}
});
module.exports = Feed;