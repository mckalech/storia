var React = require('React'),
	$ = require('jQuery'),
	Post = require('./post'),
	Modal = require('./modal');

var Feed = React.createClass({
	getInitialState: function(){
		return {
			loaded: false,
			modalIsOpen: false,
			modalData:{}
		};
	},
	componentDidMount: function(){
		var that = this;
		$.ajax({
			url:'https://storia.me/api/feed/content',
			method:'GET',
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
	hideModal:function(){
		this.setState({
			modalIsOpen:false
		});
	},
	showModal: function(url, title){
		this.setState({
			modalIsOpen:true,
			modalData:{
				url:url,
				title:title
			}
		});
	},
	render : function(){
		if(this.state.loaded){
			var feed = [];
			this.state.posts.forEach(function(item, i, ar){
				feed.push(
					<Post data={item.objectPreview} showModal={this.showModal} key={item.id} />
				)
			}.bind(this));
			return (
				<div className="row">
					<div className="b-feed col-md-5">
						{feed}
					</div>
					<Modal data={this.state.modalData} isOpen={this.state.modalIsOpen} hideModal={this.hideModal} />
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