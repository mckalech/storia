var React = require('React'),
	$ = require('jQuery'),
	Image = require('./image'),
	classNames = require('classNames');
var Link = require('react-router').Link;

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
		this.likeReq('POST', 1);
	},
	deleteLike:function(){
		this.likeReq('DELETE', -1);
	},
	likeReq:function(type, incr){
		var that = this;
		that.setState({
			liked:!that.state.liked,
			likesCount:that.state.likesCount+incr
		});
		$.ajax({
			method:type,
			url:that.url,
			contentType:'application/json',
			xhrFields: {
				withCredentials: true
			},
			success:function(){
				that.setState({
					likesBtnBlocked: false
				});
			},
			error:function(){
				that.setState({
					likesBtnBlocked: false,
					liked:!that.state.liked,
					likesCount:that.state.likesCount-incr
				});
			}
		});
	},
	render : function(){
		var classes = classNames({
			'heart': true,
			'heartAnimation': this.state.liked,
			'active': this.state.liked
		});
		var style={
			backgroundPosition : ""
		};
		var headingPanel = "";
		if (this.props.data.title) {
			headingPanel = (
				<div className="panel-heading" >
					<h3 className="panel-title">{this.props.data.title}</h3>
				</div>
			);
		}
		var url = "/post/"+this.props.data.storyId+'/'+this.props.data.id;
		if (!this.state.liked) {style.backgroundPosition = 'left';}
		return(
			<div className="panel panel-info">
				{headingPanel}
				<div className="panel-body">
					<Link to={url}>
						История: <b>{this.props.data.storyTitle}</b><br/>
						Автор: <i>{this.props.data.owner.name}</i>
					</Link>
					<Image attachments={this.props.data.attachments} />
				</div>
				<div className="panel-footer" >
					<div className={classes} style={style} onClick={this.handleLikeClick}></div>
					<i>{this.state.likesCount}</i>
				</div>
			</div>
		)
	}
});
module.exports = Post;