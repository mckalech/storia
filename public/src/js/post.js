var React = require('React'),
	$ = require('jQuery'),
	Image = require('./image'),
	classNames = require('classNames');
var Link = require('react-router').Link;
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
const Avatar = require('material-ui/lib/avatar');

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
		var url = "/post/"+this.props.data.storyId+'/'+this.props.data.id;
		if (!this.state.liked) {style.backgroundPosition = 'left';}

		var headingOpts = {};
		if (this.props.data.title) {
			headingOpts = {
				title:this.props.data.title,
				subtitle: "Story: "+this.props.data.storyTitle+" Author: " + this.props.data.owner.name,
				avatar:<Avatar>A</Avatar>
			};
		}else{
			headingOpts = {
				title: "Story: "+this.props.data.storyTitle,
				subtitle: "Author: " + this.props.data.owner.name,
				avatar:<Avatar>B</Avatar>
			};
		}


		return(
			<div className="b-card">
				<Card>
					<Link to={url}>
						<CardHeader title={headingOpts.title.substring(0,50)}
				            avatar={headingOpts.avatar}
				            subtitle={headingOpts.subtitle}/>
						<Image attachments={this.props.data.attachments}
					        title={headingOpts.title } />
					</Link>
					<div className="b-card__footer" >
						<div className={classes} style={style} onClick={this.handleLikeClick}></div>
						<i>{this.state.likesCount}</i>
					</div>
				</Card>
			</div>
		)
	}
});
module.exports = Post;