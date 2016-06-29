function combine(arr) {  
	var r = [];  
	(function f(t, a, n) {  
		if (n == 0) return r.push(t);  
		for (var i = 0; i < a[n-1].length; i++) {  
			f(t.concat(a[n-1][i]), a, n - 1);  
		}  
	})([], arr, arr.length);  
	return r;  
} 

var a=[[1,2,3],[4,5,6],[7,8,9]];
console.log(combine(a));