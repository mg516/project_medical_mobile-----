Vue.component('navmenu', {
	template:
	`<div class="navmenuBody">
		<div class="navLogo" @click="toPage('./index.html')"></div>
		<div class="menuBody">
			<el-menu :default-active="activeLink" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-submenu index="1">
					<template slot="title">学术</template>
					<el-menu-item
						@click="toPage('./essayList.html?catalogId='+item.catalogId+'&catalogName='+item.catalogName)"
						:index="'1-'+item.catalogId"
						v-for="(item,index) in menulist1"
						:key="index"
					>{{item.catalogName}}</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">测评</template>
					<el-menu-item index="assessIndex.html" @click="toPage('./assessIndex.html')">评测主页</el-menu-item>
					<el-menu-item index="assessHospitalIndex.html" @click="toPage('./assessHospitalIndex.html')">推荐的医院</el-menu-item>
					<el-menu-item index="assessDoctorIndex.html" @click="toPage('./assessDoctorIndex.html')">好医生</el-menu-item>
					<el-menu-item index="assessDrugIndex.html" @click="toPage('./assessDrugIndex.html')">医药评测</el-menu-item>
					<el-menu-item index="assessMedicineTool.html" @click="toPage('./assessMedicineTool.html')">医学工具</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">医药</template>
					<el-menu-item index="medicineHouse.html" @click="toPage('./medicineHouse.html')">产品库</el-menu-item>
					<el-menu-item index="companyHouse.html" @click="toPage('./companyHouse.html')">企业库</el-menu-item>
					<el-menu-item index="newMedicineHouse.html" @click="toPage('./newMedicineHouse.html')">新药发布</el-menu-item>
					<el-menu-item index="nearbyDrugstore.html" @click="toPage('./nearbyDrugstore.html')">附近药店</el-menu-item>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">医院</template>
					<el-menu-item index="doctorHouse.html" @click="toPage('./doctorHouse.html')">医生库</el-menu-item>
					<el-menu-item index="hospitalHouse.html0" @click="toPage('./hospitalHouse.html?tab=0')">推荐医院</el-menu-item>
					<el-menu-item index="hospitalHouse.html1" @click="toPage('./hospitalHouse.html?tab=1')">全国医院</el-menu-item>
					<el-menu-item index="doctorInterview.html" @click="toPage('./doctorInterview.html')">人物访谈</el-menu-item>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">资讯</template>
					<el-menu-item index="messageIndex.html" @click="toPage('./messageIndex.html')">资讯首页</el-menu-item>
					<el-menu-item index="messageNews.html" @click="toPage('./messageNews.html')">新闻</el-menu-item>
					<el-menu-item index="messageMeeting.html" @click="toPage('./messageMeeting.html')">会议</el-menu-item>
					<el-menu-item index="messageShow.html" @click="toPage('./messageShow.html')">展会</el-menu-item>
					<el-menu-item index="messageCourse.html" @click="toPage('./messageCourse.html')">课程</el-menu-item>
					<el-menu-item index="messageHealthy.html" @click="toPage('./messageHealthy.html')">健康生活</el-menu-item>
				</el-submenu>
				<el-menu-item index="6">
					<a href="./forumIndex.html" target="_self">论坛</a>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="searchBody">
			<el-input
				placeholder="请输入内容"
				v-model="keyword">
				<el-button @click="toSearchResult" slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<div class="postArticleIcon" title="发帖">
			<el-dropdown class="loginBox" v-if="userInfo.userName">
				<img src="../img/postArticle.png" />
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="toPage('./postDynamic.html')">发布动态</el-dropdown-item>
					<el-dropdown-item @click.native="toPage('./postArticle.html')">发布文章</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="locationBody">
			<el-button type="text" v-if="!locationName" :loading="mapLoading" @click="getLocation">获取定位</el-button>
			<el-button type="primary" icon="el-icon-location" v-else :loading="mapLoading" @click="getLocation">{{locationName}}</el-button>
		</div>
		<div class="loginBody">
			<el-dropdown trigger="click" class="loginBox" v-if="userInfo.userId">
				<img v-if="userDetailInfo && userDetailInfo.pictureStr" :src="'http://115.159.53.197:8080' + userDetailInfo.pictureStr" class="el-dropdown-link" />
				<img v-else src="../img/index/y1.png" class="el-dropdown-link" />
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="toUserCenter('company')" v-if="false && userInfo.userType === '企业'">企业-个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="toUserCenter('hospital')" v-if="false && userInfo.userType === '医院'">医院-个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="toUserCenter('person')" v-if="false && userInfo.userType === '用户'">用户-个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="toUserCenter('doctor')" v-if="false && userInfo.userType === '医生'">医生-个人中心</el-dropdown-item>
					<el-dropdown-item v-if="false">消息中心</el-dropdown-item>
					<el-dropdown-item @click.native="toUserSet">账号设置</el-dropdown-item>
					<el-dropdown-item divided class="colorRed fontBold" @click.native="loginOut">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<div v-else class="noLogin">
				<span class="loginBar" @click="toLogin">登录/注册</span>
			</div>
		</div>
		<div class="navLine"></div>
	</div>`,
	props: {
		// activeName: String,
		// showUnit: Boolean,
		// userStationNum: String
	},
	data() {
		return {
			activeLink: '1',
			keyword: '',
			userInfo: {},
			menulist1: [],
			userDetailInfo: UserDetailInfo,
			mapLoading: false,
			locationName: ''
		};
	},
	created(){
		if(ls_get('locationObj')){
			const addComp = ls_get('locationObj')
			this.locationName = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
		}else{
			this.getLocation()
		}
	},
	methods: {
		// 获取定位
		getLocation(){
			const that = this;
			var geolocation = new BMap.Geolocation();
			var gc = new BMap.Geocoder();   
			this.mapLoading = true
			geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量
				that.mapLoading = false
				if(this.getStatus() == BMAP_STATUS_SUCCESS) {  //通过Geolocation类的getStatus()可以判断是否成功定位。
					var pt = r.point;  
					gc.getLocation(pt, function(rs){  
						var addComp = rs.addressComponents;  
						$('.location').html(JSON.stringify(addComp) + '<br>' + addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber)
						console.log(addComp);
						console.log(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
						that.locationName = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
						ls_set('locationObj',addComp)
					});
				} else {
					//关于状态码  
					//BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。  
					//BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。  
					//BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。  
					//BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。  
					//BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。  
					//BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。  
					//BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)  
					//BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)  
					//BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)  
					switch( this.getStatus() ) {
						case 2:
							alert( '位置结果未知 获取位置失败.' );
						break;
						case 3:
							alert( '导航结果未知 获取位置失败..' );
						break;
						case 4:
							alert( '非法密钥 获取位置失败.' );
						break;
						case 5:
							alert( '对不起,非法请求位置  获取位置失败.' );
						break;
						case 6:
							alert( '对不起,当前 没有权限 获取位置失败.' );
						break;
						case 7:
							alert( '对不起,服务不可用 获取位置失败.' );
						break;
						case 8:
							alert( '对不起,请求超时 获取位置失败.' );
						break;
					}
				}        
			},{enableHighAccuracy: true})
		},
		toLogin(){
			location.href = `./login.html`
		},
		getUserInfo(){
			const userInfo = getUserInfo()
			if(userInfo.data){
				this.userInfo = userInfo.data
			}else{
				this.userInfo = {}
				// this.toLogin()
			}
		},
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		toUserSet(){
			const userType = this.userInfo.userType
			if(userType === '企业'){
				location.href = './userCenterCompanyAccount.html'
			}else if(userType === '医院'){
				location.href = './userCenterHospitalAccount.html'
			}else if(userType === '用户'){
				location.href = './userCenterPersonAccount.html'
			}else if(userType === '医生'){
				location.href = './userCenterDoctor.html'
			}
			// if(type === 'person'){
			// 	location.href = './userCenterPerson.html'
			// }else if(type === 'company'){
			// 	location.href = './userCenterCompany.html'
			// }else if(type === 'hospital'){
			// 	location.href = './userCenterHospital.html'
			// }else if(type === 'doctor'){
			// 	location.href = './userCenterDoctor.html'
			// }
		},
		toUserCenter(type) {
			if(type === 'person'){
				location.href = './userCenterPerson.html'
			}else if(type === 'company'){
				location.href = './userCenterCompany.html'
			}else if(type === 'hospital'){
				location.href = './userCenterHospital.html'
			}else if(type === 'doctor'){
				location.href = './userCenterDoctor.html'
			}
		},
		toPage(path){
			location.href = path
		},
		toSearchResult() {
			if(this.keyword){
				location.href = `./searchResult.html?keyword=${this.keyword}`
			}
		},
		loginOut(){
			ls_remove('userInfo')
			ls_remove('userDetailInfo')
			location.href = './index.html'
		},
		getMenuItem(){
			postModelListByName('学术').then(res => {
				if(res.data && res.data.msg === "success"){
					this.menulist1 = [{catalogName:'全部',catalogId:'all'}].concat(res.data.data)
				}
			})
		}
	},
    mounted() {
		const hrefArr = location.href.split('/')
		let html = hrefArr[hrefArr.length - 1].split('?')[0]
		if(html === 'hospitalHouse.html'){
			html = html + getUrlParam('tab') || 0
		}
		this.activeLink = html
		this.getMenuItem()
		this.getUserInfo()
	}
});