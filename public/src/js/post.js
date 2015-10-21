var React = require('React'),
	$ = require('jQuery');

var Post = React.createClass({
	getInitialState: function(){
		return {
			likesBtnBlocked: false,
			liked: this.props.data.context.liked,
			likesCount: this.props.data.stats.likes
		};
	},
	componentDidMount: function(){
		this.url = 'https://storia.me/api/core/stories/'+this.props.data.storyId+'/moments/'+this.props.data.id+'/like';
	},
	getImage: function(){
		var atts = this.props.data.attachments,
			url;
		if(!atts.length){
			return 'No Image';
		}
		var images = atts.filter(function(att, i){
			return att.file.title.match(/\d+/g) ? false : true;
		});
		if(images.length){
			url = images[images.length-1].file.path;
		}else{
			url = atts[atts.length-1].file.path;
		}
		return <img src={url} className="img-rounded b-post__image"/>

	},
	handleLikeClick:function(){
		if(!this.state.likesBtnBlocked){
			this.setState({likesBtnBlocked: true});
			if(this.state.liked){
				this.deleteLike();
			}else{
				this.postLike();
			}
		}
	},
	postLike:function(){
		var that = this;
		$.ajax({
			type:'POST',
			url:that.url,
			xhrFields: {
				withCredentials: true
			},
			success:function(res){
				that.setState({
					likesBtnBlocked: false,
					liked:true,
					likesCount:that.state.likesCount+1
				});
			}
		});
	},
	deleteLike:function(){
		var that = this;
		$.ajax({
			type:'DELETE',
			url:that.url,
			xhrFields: {
				withCredentials: true
			},
			success:function(res){
				that.setState({
					likesBtnBlocked: false,
					liked:false,
					likesCount:that.state.likesCount-1
				});
			}
		});
	},
	render : function(){
		var likedText = '';
		if(!this.state.liked){
			likedText = 'not ';
		}
		return(
			<div className="panel panel-info">
				<div className="panel-heading">
					<h3 className="panel-title">{this.props.data.title}</h3>
				</div>
				<div className="panel-body">
					<div><b>{this.props.data.storyTitle}</b> <i>{this.props.data.owner.name}</i></div>
					<div>{this.getImage()}</div>
				</div>
				<div className="panel-footer" onClick={this.handleLikeClick}>{this.state.likesCount} likes, you {likedText} liked</div>
			</div>
		)
	}
});
module.exports = Post;