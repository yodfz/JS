sysadminApp.directive("page",function(){
	return {
		restrict:'EA',
		replace:true,
		scope:{
			currentPage:"=currentpage",
			allPage:"=allpage",
			allCount:"=allcount",
			maxSize:"=maxsize",
			//onchangePage:"&",
			change:"&ngclick"
		},
		templateUrl:'page.html',
		controller:function($scope){
			//var $pageModel=$scope.pageModel;
			//console.log($scope);
			//$scope.pageIndex=[];
			//var $startIndex=1;
			//var $endIndex=$pageModel.allPage;
		},
		link: function (scope, element, attrs) {
			var $start,$end;
			scope.$watch('currentPage', function (value) {
				scope.render();
			});
			scope.$watch('allPage', function (value) {
				scope.render();
			});

			scope.render=function(){
				scope.allPage=scope.allPage||1;
				scope.currentPage=scope.currentPage||1;
				if(scope.allPage<1) scope.allPage=1;
				$start=scope.currentPage*1-scope.maxSize;
				$end=scope.currentPage*1+scope.maxSize;
				if($start<1) $start=1;
				if($end>scope.allPage) $end=scope.allPage;
				scope.pageNumber=[];
				for(var i=$start;i<=$end;i++){
					scope.pageNumber.push(i);
				}
			};

			scope.onchange=function(_){
				scope.currentPage=_;
				scope.change(_);
			};

			scope.prev=function(){
				if(scope.currentPage>1){
					scope.currentPage-=1;
					scope.change(scope.currentPage);
				}
			};

			scope.next=function(){
				if(scope.currentPage<scope.allPage){
					scope.currentPage+=1;
					scope.change(scope.currentPage);
				}
			}
		}
	}
});