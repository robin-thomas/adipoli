import Image from 'next/image';

const Issuer = ({ issuer }) => {
  if (!issuer) {
    return null;
  }

  let image;
  switch (issuer) {
    case 'visa':
      image =
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSIxNjZweCIgdmlld0JveD0iMCAwIDUxMiAxNjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPiAgICA8Zz4gICAgICAgIDxwYXRoIGQ9Ik0yNjQuNzk0MTg3LDExMi40Nzk0OTEgQzI2NC41MDIwNzIsODkuNDQ4NTYxNiAyODUuMzE5MDgsNzYuNTk1NTE5OCAzMDEuMDAxMDIxLDY4Ljk1NDQxNzIgQzMxNy4xMTM0NDcsNjEuMTEzNDQ2NiAzMjIuNTI1MjU0LDU2LjA4NjAwMDggMzIyLjQ2Mzc1Niw0OS4wNzUyNTA3IEMzMjIuMzQwNzYsMzguMzQzODgzMyAzMDkuNjEwNzE0LDMzLjYwODU1MiAyOTcuNjk1NTE0LDMzLjQyNDA1ODYgQzI3Ni45MDkyNTUsMzMuMTAxMTk1MSAyNjQuODI0OTM1LDM5LjAzNTczMzYgMjU1LjIxNTkwMyw0My41MjUwNzM2IEwyNDcuNzI4NTQ1LDguNDg2Njk3NSBDMjU3LjM2ODMyNiw0LjA0MzQ4MDg3IDI3NS4yMTgwNjUsMC4xNjkxMTg5NzIgMjkzLjcyODkwNSwtMS40MjEwODU0N2UtMTQgQzMzNy4xNzcxMDYsLTEuNDIxMDg1NDdlLTE0IDM2NS42MDQ0NjgsMjEuNDQ3MzYwNSAzNjUuNzU4MjEzLDU0LjcwMjMwMDIgQzM2NS45MjczMzIsOTYuOTA1MTcwOSAzMDcuMzgxNDE5LDk5LjI0MjA4NzYgMzA3Ljc4MTE1NCwxMTguMTA2NTQgQzMwNy45MTk1MjQsMTIzLjgyNTgzNiAzMTMuMzc3NDU1LDEyOS45Mjk0OTQgMzI1LjMzODc3OCwxMzEuNDgyMzEzIEMzMzEuMjU3OTQyLDEzMi4yNjY0MSAzNDcuNjAwOTg1LDEzMi44NjYwMTQgMzY2LjEyNzIsMTI0LjMzMzE5MyBMMzczLjM5OTMxNSwxNTguMjMzODYgQzM2My40MzY2NywxNjEuODYyMjMgMzUwLjYyOTc1MiwxNjUuMzM2ODU3IDMzNC42ODY0NDUsMTY1LjMzNjg1NyBDMjkzLjc5MDQwMywxNjUuMzM2ODU3IDI2NS4wMjQ4MDMsMTQzLjU5NzM4MiAyNjQuNzk0MTg3LDExMi40Nzk0OTEgTTQ0My4yNzYyLDE2Mi40MTU3MTEgQzQzNS4zNDI5ODIsMTYyLjQxNTcxMSA0MjguNjU1MDk2LDE1Ny43ODgwMDEgNDI1LjY3MjQ1MiwxNTAuNjg1MDA0IEwzNjMuNjA1Nzg5LDIuNDkwNjYxMjIgTDQwNy4wMjMyNDIsMi40OTA2NjEyMiBMNDE1LjY2MzY4NCwyNi4zNjcxODUyIEw0NjguNzIwOTE4LDI2LjM2NzE4NTIgTDQ3My43MzI5ODksMi40OTA2NjEyMiBMNTEyLDIuNDkwNjYxMjIgTDQ3OC42MDY2OSwxNjIuNDE1NzExIEw0NDMuMjc2MiwxNjIuNDE1NzExIE00NDkuMzQ5MTA4LDExOS4yMTM1MDEgTDQ2MS44NzkyODcsNTkuMTYwODkxMiBMNDI3LjU2MzUxLDU5LjE2MDg5MTIgTDQ0OS4zNDkxMDgsMTE5LjIxMzUwMSBNMjEyLjE1MjA2MywxNjIuNDE1NzExIEwxNzcuOTI4NTMzLDIuNDkwNjYxMjIgTDIxOS4zMDExODMsMi40OTA2NjEyMiBMMjUzLjUwOTMzOSwxNjIuNDE1NzExIEwyMTIuMTUyMDYzLDE2Mi40MTU3MTEgTTE1MC45NDYzNywxNjIuNDE1NzExIEwxMDcuODgyNTMsNTMuNTY0NTkwNyBMOTAuNDYzMjc1NSwxNDYuMTE4NzkyIEM4OC40MTg0NzM0LDE1Ni40NTA0MjMgODAuMzQ2ODg2MSwxNjIuNDE1NzExIDcxLjM4MzU4MDYsMTYyLjQxNTcxMSBMMC45ODM5NjQ5MjcsMTYyLjQxNTcxMSBMMCwxNTcuNzcyNjI2IEMxNC40NTE5ODQ5LDE1NC42MzYyMzggMzAuODcxODk5NiwxNDkuNTc4MDQzIDQwLjgxOTE3LDE0NC4xNjYyMzYgQzQ2LjkwNzQ1MywxNDAuODYwNzI5IDQ4LjY0NDc2NjEsMTM3Ljk3MDMzMiA1MC42NDM0NDQ4LDEzMC4xMTM5ODcgTDgzLjYzNzAxODgsMi40OTA2NjEyMiBMMTI3LjM2MTk2LDIuNDkwNjYxMjIgTDE5NC4zOTQ1NzEsMTYyLjQxNTcxMSBMMTUwLjk0NjM3LDE2Mi40MTU3MTEiIGZpbGw9IiNGRkZGRkYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1Ni4wMDAwMDAsIDgyLjY2ODQyOCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMjU2LjAwMDAwMCwgLTgyLjY2ODQyOCkgIj48L3BhdGg+ICAgIDwvZz48L3N2Zz4=';
      break;

    case 'visaelectron':
      image =
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSIyMjhweCIgdmlld0JveD0iMCAwIDUxMiAyMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPiAgICA8Zz4gICAgICAgIDxwYXRoIGQ9Ik0xOTQuMzkzMDEyLDIuOTE5MzQ0MTMgTDEyNy4zNjI1MTcsMTYyLjgzNTk4MSBMODMuNjI3OTMwNywxNjIuODM1OTgxIEw1MC42MzkwMTUyLDM1LjIwODY2MzIgQzQ4LjY0MTU2OTIsMjcuMzY1OTkwNyA0Ni45MDIzODU1LDI0LjQ3OTMzOCA0MC44MTUyNDI0LDIxLjE2NDQyNzYgQzMwLjg2NzI0MjIsMTUuNzYwNTM1MyAxNC40Mzk4MDE4LDEwLjcwNjQ0MTIgMCw3LjU2MTUyNjI4IEwwLjk3NDIwNDQyNCwyLjkxOTM0NDEzIEw3MS4zODE3MjM1LDIuOTE5MzQ0MTMgQzgwLjM0MjQ0MjcsMi45MTkzNDQxMyA4OC40MTA2ODYsOC44ODU1Mjg5NCA5MC40NjA0MzgzLDE5LjIxNjAxODggTDEwNy44OTE1MDUsMTExLjc2MjE3IEwxNTAuOTIzMjI2LDIuOTE5MzQ0MTMgTDE5NC4zOTMwMTIsMi45MTkzNDQxMyBaIE0yNTMuNTE1NDUyLDIuOTE5MzQ0MTMgTDIxOS4zMDcxNDYsMTYyLjgzNTk4MSBMMTc3LjkzMjg4LDE2Mi44MzU5ODEgTDIxMi4xNDExODYsMi45MTkzNDQxMyBMMjUzLjUxNTQ1MiwyLjkxOTM0NDEzIFogTTMwNy43Nzk5NDYsNDcuMjI5Mjk5NyBDMzA3LjkyMDUxOSw0MS40OTg0OTMxIDMxMy4zNzk5ODcsMzUuMzk1MDA0MyAzMjUuMzMxOTcxLDMzLjgzNTYyMzQgQzMzMS4yNTIzODgsMzMuMDcwNjQ0MSAzNDcuNjA3OTA3LDMyLjQ1OTMxNDUgMzY2LjEzNDEzNyw0MC45OTUwNDUyIEwzNzMuMzgxODI2LDcuMDY0NjE2NjQgQzM2My40MjcyODcsMy40NjUyOTA5IDM1MC42MTg3ODcsMCAzMzQuNjg0OTg3LDAgQzI5My43ODQ3NDcsMCAyNjUuMDEzMDI1LDIxLjcyMzQ1MSAyNjQuNzg0MTg2LDUyLjg1NTQ5MzcgQzI2NC41MTYxMTYsNzUuODgzMzMyNSAyODUuMzM0MDE0LDg4LjcxNzk4NTQgMzAwLjk4OTkzNyw5Ni4zODczOTM0IEMzMTcuMTE2NjE2LDEwNC4yMjAyNTggMzIyLjUyMzc3OCwxMDkuMjU0NzM4IDMyMi40NDg1ODgsMTE2LjI1Mzk3MSBDMzIyLjMzNDE2OCwxMjYuOTgzMjk3IDMwOS41NzE0MzYsMTMxLjczMzM2MSAyOTcuNzA0NDQ5LDEzMS45MDk4OTQgQzI3Ni44OTYzNTgsMTMyLjI0MDA3OCAyNjQuODMzMjIzLDEyNi4yODY5NjkgMjU1LjIxMjEzNywxMjEuODA0OTc1IEwyNDcuNzAyOTE3LDE1Ni44NTk5ODkgQzI1Ny4zODI4NDcsMTYxLjI5NjIxNSAyNzUuMjIyNTU3LDE2NS4xNTA1MzQgMjkzLjY5OTc1LDE2NS4zNDY2ODIgQzMzNy4xNzkzNDMsMTY1LjM0NjY4MiAzNjUuNjE3NjEzLDE0My44NzE2ODYgMzY1Ljc0NTEwOSwxMTAuNjI0NTA4IEMzNjUuOTE4Mzc0LDY4LjQyNjQxODggMzA3LjM5NzQ1Niw2Ni4wODU3MTI4IDMwNy43Nzk5NDYsNDcuMjI5Mjk5NyBaIE00NzMuNzQ3NzY1LDE2Mi44MzU5ODEgTDUxMiwxNjIuODM1OTgxIEw0NzguNTc5NTU4LDIuOTE5MzQ0MTMgTDQ0My4yODU4OTcsMi45MTkzNDQxMyBDNDM1LjMyNTUzNSwyLjkxOTM0NDEzIDQyOC42MzY4Nyw3LjUzODY0MjI4IDQyNS42Njg0ODksMTQuNjQyNDg4NiBMMzYzLjU4NzQ3NSwxNjIuODM1OTgxIEw0MDcuMDM0Mzc3LDE2Mi44MzU5ODEgTDQxNS42NTE4MzYsMTM4Ljk0ODM1OCBMNDY4LjczMjkwMSwxMzguOTQ4MzU4IEw0NzMuNzQ3NzY1LDE2Mi44MzU5ODEgWiBNNDI3LjU2NDU5MSwxMDYuMTc4NDc1IEw0NDkuMzUwMTU2LDQ2LjEyNDMyOTYgTDQ2MS44NjQ0MzMsMTA2LjE3ODQ3NSBMNDI3LjU2NDU5MSwxMDYuMTc4NDc1IFogTTMwNi40NjQ3NywyMDYuODU0MzI5IEwyODkuNjU0ODQsMjA2Ljg1NDMyOSBMMjg5LjY1NDg0LDIyMi41MDA0NDQgTDMwOC40NTg5NDcsMjIyLjUwMDQ0NCBMMzA4LjQ1ODk0NywyMjcuMjA0NzQgTDI4My45ODk0MTYsMjI3LjIwNDc0IEwyODMuOTg5NDE2LDE4My43OTcwNjggTDMwNy40OTQ1NSwxODMuNzk3MDY4IEwzMDcuNDk0NTUsMTg4LjUwMTM2NCBMMjg5LjY1NDg0LDE4OC41MDEzNjQgTDI4OS42NTQ4NCwyMDIuMjE1NDE2IEwzMDYuNDY0NzcsMjAyLjIxNTQxNiBMMzA2LjQ2NDc3LDIwNi44NTQzMjkgWiBNMzE3LjE0MzQyMywxODEuNDgxMjA4IEwzMjIuODA4ODQ3LDE4MS40ODEyMDggTDMyMi44MDg4NDcsMjI3LjIwMzQzMyBMMzE3LjE0MzQyMywyMjcuMjAzNDMzIEwzMTcuMTQzNDIzLDE4MS40ODEyMDggWiBNMzQ3Ljc4NzM4MywyMjMuNDY5MDkxIEMzNTEuODQ3NjU4LDIyMy40NjkwOTEgMzU0LjM1ODM1OSwyMjIuNzU5Njg3IDM1Ni40MjExODgsMjIxLjg2MDY3MyBMMzU3LjQ1MDk2OCwyMjUuOTE3Njc5IEMzNTUuNDUzNTIyLDIyNi44MTY2OTMgMzUxLjk3ODQyNCwyMjcuOTExODU2IDM0Ny4wMTU4NjYsMjI3LjkxMTg1NiBDMzM3LjQyNDIwMiwyMjcuOTExODU2IDMzMS42OTMzOTUsMjIxLjUzNzAyOCAzMzEuNjkzMzk1LDIxMi4xMzQ5NzUgQzMzMS42OTMzOTUsMjAyLjczMjkyMSAzMzcuMjI4MDUzLDE5NS4zOTA0MjggMzQ2LjMwOTczMSwxOTUuMzkwNDI4IEMzNTYuNTQ4Njg1LDE5NS4zOTA0MjggMzU5LjE5MDE1MiwyMDQuMjc5MjI2IDM1OS4xOTAxNTIsMjEwLjAxMDAzMiBDMzU5LjE5MDE1MiwyMTEuMTY3MzA5IDM1OS4xMjQ3NjksMjEyLjAwNDIwOSAzNTguOTk0MDAzLDIxMi42NDgyMyBMMzM3LjEwMDU1NywyMTIuNjQ4MjMgQzMzNy4yMjgwNTMsMjIwLjMxNDM2OSAzNDIuMDU5ODQ2LDIyMy40NjkwOTEgMzQ3Ljc4NzM4MywyMjMuNDY5MDkxIFogTTM1My43MTQzMzgsMjA4LjU5MTIyNCBDMzUzLjc3OTcyMSwyMDUuMDUwNzQzIDM1Mi4yMzM0MTcsMTk5LjQ0NzQzMyAzNDUuODU4NTg5LDE5OS40NDc0MzMgQzM0MC4wNjI0LDE5OS40NDc0MzMgMzM3LjYxMzgxMiwyMDQuNjY0OTg0IDMzNy4xNjI2NywyMDguNTkxMjI0IEwzNTMuNzE0MzM4LDIwOC41OTEyMjQgWiBNMzkwLjAyMjc0MSwyMjYuMTA4NTk3IEMzODguNTQxODE5LDIyNi44MTgwMDEgMzg1LjI1NjMzMSwyMjcuOTEzMTYzIDM4MS4wNzE4MjksMjI3LjkxMzE2MyBDMzcxLjY2OTc3NiwyMjcuOTEzMTYzIDM2NS41NTMyMSwyMjEuNTM4MzM2IDM2NS41NTMyMSwyMTIuMDA1NTE3IEMzNjUuNTUzMjEsMjAyLjQxMDU4NCAzNzIuMTE3NjQ4LDE5NS4zOTE3MzUgMzgyLjI5NDQ4OCwxOTUuMzkxNzM1IEMzODUuNjQyMDksMTk1LjM5MTczNSAzODguNjAzOTMzLDE5Ni4yMjUzNjcgMzkwLjE1MDIzOCwxOTcuMDY1NTM2IEwzODguODY1NDY1LDIwMS4zODA4MDQgQzM4Ny41MDg3NywyMDAuNjcxNCAzODUuMzgzODI4LDE5OS44OTY2MTMgMzgyLjI5NDQ4OCwxOTkuODk2NjEzIEMzNzUuMTQ0ODc0LDE5OS44OTY2MTMgMzcxLjI4NDAxNywyMDUuMjQxNjYxIDM3MS4yODQwMTcsMjExLjY4NTE0MSBDMzcxLjI4NDAxNywyMTguODk2ODY5IDM3NS45MTk2NjEsMjIzLjMzOTYzMyAzODIuMTAxNjA5LDIyMy4zMzk2MzMgQzM4NS4zMjE3MTQsMjIzLjMzOTYzMyAzODcuNDQ2NjU3LDIyMi41NjgxMTYgMzg5LjA1NTA3NSwyMjEuODU4NzEyIEwzOTAuMDIyNzQxLDIyNi4xMDg1OTcgWiBNNDA1LjkxODI5MiwxODguNTY0NDU4IEw0MDUuOTE4MjkyLDE5Ni4wMzQ0NDkgTDQxNC4wMjkwMzQsMTk2LjAzNDQ0OSBMNDE0LjAyOTAzNCwyMDAuMzQ2NDQ3IEw0MDUuOTE4MjkyLDIwMC4zNDY0NDcgTDQwNS45MTgyOTIsMjE3LjE1NjM3NyBDNDA1LjkxODI5MiwyMjEuMDIzNzczIDQwNy4wMTM0NTUsMjIzLjIxMDgyOSA0MTAuMTY4MTc3LDIyMy4yMTA4MjkgQzQxMS43MTEyMTIsMjIzLjIxMDgyOSA0MTIuNjE2NzY1LDIyMy4wODMzMzIgNDEzLjQ1MzY2NSwyMjIuODIxODAxIEw0MTMuNzExOTI3LDIyNy4xNDAzMzggQzQxMi42MTY3NjUsMjI3LjUyNjA5NyA0MTAuODc3NTgxLDIyNy45MTE4NTYgNDA4LjY4NzI1NSwyMjcuOTExODU2IEM0MDYuMDQ1Nzg4LDIyNy45MTE4NTYgNDAzLjkyMDg0NiwyMjcuMDA5NTcyIDQwMi41NzA2OSwyMjUuNTMxOTIgQzQwMS4wMjQzODYsMjIzLjc4OTQ2NyA0MDAuMzgwMzY1LDIyMS4wMjM3NzMgNDAwLjM4MDM2NSwyMTcuMzUyNTI2IEw0MDAuMzgwMzY1LDIwMC4zNDY0NDcgTDM5NS41NDg1NzIsMjAwLjM0NjQ0NyBMMzk1LjU0ODU3MiwxOTYuMDM0NDQ5IEw0MDAuMzgwMzY1LDE5Ni4wMzQ0NDkgTDQwMC4zODAzNjUsMTkwLjIzODI1OSBMNDA1LjkxODI5MiwxODguNTY0NDU4IFogTTQyMS45NDQ5MzUsMjA1Ljc1OTQ5MyBDNDIxLjk0NDkzNSwyMDIuMDg4MjQ2IDQyMS44NzYyODMsMTk4LjkzMzUyNCA0MjEuNjg2NjczLDE5Ni4wMzM3OTUgTDQyNi42NDU5NjIsMTk2LjAzMzc5NSBMNDI2LjkwNDIyNCwyMDIuMjE1NzQzIEw0MjcuMDkzODM1LDIwMi4yMTU3NDMgQzQyOC41MTI2NDIsMTk4LjAzMTI0MSA0MzEuOTg3NzQxLDE5NS4zODk3NzQgNDM1Ljc4NjQ4NCwxOTUuMzg5Nzc0IEM0MzYuMzY4MzkxLDE5NS4zODk3NzQgNDM2LjgxOTUzMywxOTUuNDU1MTU3IDQzNy4zMzYwNTgsMTk1LjUxNzI3IEw0MzcuMzM2MDU4LDIwMC44NjU1ODcgQzQzNi43NTQxNSwyMDAuNzM0ODIxIDQzNi4xNzg3ODEsMjAwLjczNDgyMSA0MzUuNDAwNzI1LDIwMC43MzQ4MjEgQzQzMS40MTIzNzIsMjAwLjczNDgyMSA0MjguNTc0NzU2LDIwMy42OTY2NjQgNDI3LjgwMzIzOCwyMDcuOTQ5ODE5IEM0MjcuNjc1NzQyLDIwOC43MjEzMzYgNDI3LjYxMDM1OSwyMDkuNjg1NzMzIDQyNy42MTAzNTksMjEwLjU5MTI4NiBMNDI3LjYxMDM1OSwyMjcuMjA1MDY3IEw0MjEuOTQ0OTM1LDIyNy4yMDUwNjcgTDQyMS45NDQ5MzUsMjA1Ljc1OTQ5MyBaIE00NzIuMTY2NDgxLDIxMS4zNjExNjkgQzQ3Mi4xNjY0ODEsMjIyLjg4ODE2NSA0NjQuMTE0NTgzLDIyNy45MTI4MzYgNDU2LjY0NDU5MywyMjcuOTEyODM2IEM0NDguMjcyMzIsMjI3LjkxMjgzNiA0NDEuNzA3ODgyLDIyMS43Mjc2MTkgNDQxLjcwNzg4MiwyMTEuODc3NjkzIEM0NDEuNzA3ODgyLDIwMS41MDc5NzQgNDQ4LjU5NTk2NSwxOTUuMzkxNDA4IDQ1Ny4xNjExMTgsMTk1LjM5MTQwOCBDNDY2LjExMjAyOSwxOTUuMzkxNDA4IDQ3Mi4xNjY0ODEsMjAxLjg5MzczMiA0NzIuMTY2NDgxLDIxMS4zNjExNjkgWiBNNDQ3LjUwMDgwMiwyMTEuNjg0ODE0IEM0NDcuNTAwODAyLDIxOC41MTA3ODMgNDUxLjM2NDkyOCwyMjMuNjYyOTUxIDQ1Ni45MDI4NTUsMjIzLjY2Mjk1MSBDNDYyLjMxMzI4NiwyMjMuNjYyOTUxIDQ2Ni4zNjcwMjMsMjE4LjU3Mjg5NyA0NjYuMzY3MDIzLDIxMS41NTQwNDggQzQ2Ni4zNjcwMjMsMjA2LjI3NDM4MyA0NjMuNzI4ODI1LDE5OS42MzgwMjQgNDU3LjAzMDM1MiwxOTkuNjM4MDI0IEM0NTAuNDAwNTMxLDE5OS42MzgwMjQgNDQ3LjUwMDgwMiwyMDUuODIzMjQyIDQ0Ny41MDA4MDIsMjExLjY4NDgxNCBaIE00ODAuODQ5OTc3LDIwNC40Njk0OSBDNDgwLjg0OTk3NywyMDEuMTg3MjcxIDQ4MC43ODEzMjUsMTk4LjYxMTE4NyA0ODAuNTkxNzE1LDE5Ni4wMzUxMDIgTDQ4NS42MTMxMTcsMTk2LjAzNTEwMiBMNDg1LjkzNjc2MywyMDEuMTg3MjcxIEw0ODYuMDY0MjU5LDIwMS4xODcyNzEgQzQ4Ny42MTA1NjMsMTk4LjI4NzU0MiA0OTEuMjE2NDI3LDE5NS4zOTEwODEgNDk2LjM2ODU5NiwxOTUuMzkxMDgxIEM1MDAuNjgwNTk1LDE5NS4zOTEwODEgNTA3LjM3OTA2NywxOTcuOTY3MTY2IDUwNy4zNzkwNjcsMjA4LjY1Mzk5MiBMNTA3LjM3OTA2NywyMjcuMjAzMTA2IEw1MDEuNzEzNjQ0LDIyNy4yMDMxMDYgTDUwMS43MTM2NDQsMjA5LjIzNTg5OSBDNTAxLjcxMzY0NCwyMDQuMjE0NDk3IDQ5OS44NDY5NjMsMjAwLjAyNjcyNSA0OTQuNTAxOTE2LDIwMC4wMjY3MjUgQzQ5MC44MzA2NjksMjAwLjAyNjcyNSA0ODcuOTMwOTM5LDIwMi42NjgxOTIgNDg2LjkwNDQyOSwyMDUuODIyOTE1IEM0ODYuNjQyODk3LDIwNi41MzIzMTkgNDg2LjUxNTQwMSwyMDcuNDk2NzE2IDQ4Ni41MTU0MDEsMjA4LjQ2NDM4MiBMNDg2LjUxNTQwMSwyMjcuMjAzMTA2IEw0ODAuODQ5OTc3LDIyNy4yMDMxMDYgTDQ4MC44NDk5NzcsMjA0LjQ2OTQ5IFoiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4gICAgPC9nPjwvc3ZnPg==';
      break;

    case 'mastercard':
      image =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjM5NyIgdmlld0JveD0iMCAwIDUxMiAzOTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPjxwYXRoIGQ9Ik05My4wNzkgMzk2LjAyM3YtMjYuMzQzYzAtMTAuMDk4LTYuMTQ3LTE2LjY4NC0xNi42ODQtMTYuNjg0LTUuMjY5IDAtMTAuOTc2IDEuNzU2LTE0LjkyOCA3LjQ2NC0zLjA3My00LjgzLTcuNDY0LTcuNDY0LTE0LjA1LTcuNDY0LTQuMzkgMC04Ljc4MSAxLjMxNy0xMi4yOTMgNi4xNDd2LTUuMjY5aC05LjIydjQyLjE0OWg5LjIydi0yMy4yN2MwLTcuNDY0IDMuOTUxLTEwLjk3NiAxMC4wOTgtMTAuOTc2czkuMjIgMy45NTEgOS4yMiAxMC45NzZ2MjMuMjdoOS4yMnYtMjMuMjdjMC03LjQ2NCA0LjM5LTEwLjk3NiAxMC4wOTgtMTAuOTc2IDYuMTQ3IDAgOS4yMiAzLjk1MSA5LjIyIDEwLjk3NnYyMy4yN2gxMC4wOTh6bTEzNi41NDQtNDIuMTQ5aC0xNC45Mjh2LTEyLjczMmgtOS4yMnYxMi43MzJoLTguMzQydjguMzQyaDguMzQydjE5LjMxOGMwIDkuNjU5IDMuOTUxIDE1LjM2NyAxNC40ODkgMTUuMzY3IDMuOTUxIDAgOC4zNDItMS4zMTcgMTEuNDE1LTMuMDczbC0yLjYzNC03LjkwM2MtMi42MzQgMS43NTYtNS43MDggMi4xOTUtNy45MDMgMi4xOTUtNC4zOSAwLTYuMTQ3LTIuNjM0LTYuMTQ3LTcuMDI1di0xOC44NzloMTQuOTI4di04LjM0MnptNzguMTUxLS44NzhjLTUuMjY5IDAtOC43ODEgMi42MzQtMTAuOTc2IDYuMTQ3di01LjI2OWgtOS4yMnY0Mi4xNDloOS4yMnYtMjMuNzA5YzAtNy4wMjUgMy4wNzMtMTAuOTc2IDguNzgxLTEwLjk3NiAxLjc1NiAwIDMuOTUxLjQzOSA1LjcwOC44NzhsMi42MzQtOC43ODFjLTEuNzU2LS40MzktNC4zOS0uNDM5LTYuMTQ3LS40Mzl6bS0xMTguMTA0IDQuMzljLTQuMzktMy4wNzMtMTAuNTM3LTQuMzktMTcuMTIzLTQuMzktMTAuNTM3IDAtMTcuNTYyIDUuMjY5LTE3LjU2MiAxMy42MTEgMCA3LjAyNSA1LjI2OSAxMC45NzYgMTQuNDg5IDEyLjI5M2w0LjM5LjQzOWM0LjgzLjg3OCA3LjQ2NCAyLjE5NSA3LjQ2NCA0LjM5IDAgMy4wNzMtMy41MTIgNS4yNjktOS42NTkgNS4yNjlzLTEwLjk3Ni0yLjE5NS0xNC4wNS00LjM5bC00LjM5IDcuMDI1YzQuODMgMy41MTIgMTEuNDE1IDUuMjY5IDE4LjAwMSA1LjI2OSAxMi4yOTMgMCAxOS4zMTgtNS43MDggMTkuMzE4LTEzLjYxMSAwLTcuNDY0LTUuNzA4LTExLjQxNS0xNC40ODktMTIuNzMybC00LjM5LS40MzljLTMuOTUxLS40MzktNy4wMjUtMS4zMTctNy4wMjUtMy45NTEgMC0zLjA3MyAzLjA3My00LjgzIDcuOTAzLTQuODMgNS4yNjkgMCAxMC41MzcgMi4xOTUgMTMuMTcxIDMuNTEybDMuOTUxLTcuNDY0em0yNDQuOTktNC4zOWMtNS4yNjkgMC04Ljc4MSAyLjYzNC0xMC45NzYgNi4xNDd2LTUuMjY5aC05LjIydjQyLjE0OWg5LjIydi0yMy43MDljMC03LjAyNSAzLjA3My0xMC45NzYgOC43ODEtMTAuOTc2IDEuNzU2IDAgMy45NTEuNDM5IDUuNzA4Ljg3OGwyLjYzNC04Ljc4MWMtMS43NTYtLjQzOS00LjM5LS40MzktNi4xNDctLjQzOXptLTExNy42NjUgMjEuOTUyYzAgMTIuNzMyIDguNzgxIDIxLjk1MiAyMi4zOTIgMjEuOTUyIDYuMTQ3IDAgMTAuNTM3LTEuMzE3IDE0LjkyOC00LjgzbC00LjM5LTcuNDY0Yy0zLjUxMiAyLjYzNC03LjAyNSAzLjk1MS0xMC45NzYgMy45NTEtNy40NjQgMC0xMi43MzItNS4yNjktMTIuNzMyLTEzLjYxMSAwLTcuOTAzIDUuMjY5LTEzLjE3MSAxMi43MzItMTMuNjExIDMuOTUxIDAgNy40NjQgMS4zMTcgMTAuOTc2IDMuOTUxbDQuMzktNy40NjRjLTQuMzktMy41MTItOC43ODEtNC44My0xNC45MjgtNC44My0xMy42MTEgMC0yMi4zOTIgOS4yMi0yMi4zOTIgMjEuOTUyem04NS4xNzYgMHYtMjEuMDc0aC05LjIydjUuMjY5Yy0zLjA3My0zLjk1MS03LjQ2NC02LjE0Ny0xMy4xNzEtNi4xNDctMTEuODU0IDAtMjEuMDc0IDkuMjItMjEuMDc0IDIxLjk1MiAwIDEyLjczMiA5LjIyIDIxLjk1MiAyMS4wNzQgMjEuOTUyIDYuMTQ3IDAgMTAuNTM3LTIuMTk1IDEzLjE3MS02LjE0N3Y1LjI2OWg5LjIydi0yMS4wNzR6bS0zMy44MDcgMGMwLTcuNDY0IDQuODMtMTMuNjExIDEyLjczMi0xMy42MTEgNy40NjQgMCAxMi43MzIgNS43MDggMTIuNzMyIDEzLjYxMSAwIDcuNDY0LTUuMjY5IDEzLjYxMS0xMi43MzIgMTMuNjExLTcuOTAzLS40MzktMTIuNzMyLTYuMTQ3LTEyLjczMi0xMy42MTF6bS0xMTAuMjAxLTIxLjk1MmMtMTIuMjkzIDAtMjEuMDc0IDguNzgxLTIxLjA3NCAyMS45NTIgMCAxMy4xNzEgOC43ODEgMjEuOTUyIDIxLjUxMyAyMS45NTIgNi4xNDcgMCAxMi4yOTMtMS43NTYgMTcuMTIzLTUuNzA4bC00LjM5LTYuNTg2Yy0zLjUxMiAyLjYzNC03LjkwMyA0LjM5LTEyLjI5MyA0LjM5LTUuNzA4IDAtMTEuNDE1LTIuNjM0LTEyLjczMi0xMC4wOThoMzEuMTczdi0zLjUxMmMuNDM5LTEzLjYxMS03LjQ2NC0yMi4zOTItMTkuMzE4LTIyLjM5MnptMCA3LjkwM2M1LjcwOCAwIDkuNjU5IDMuNTEyIDEwLjUzNyAxMC4wOThoLTIxLjk1MmMuODc4LTUuNzA4IDQuODMtMTAuMDk4IDExLjQxNS0xMC4wOTh6bTIyOC43NDUgMTQuMDV2LTM3Ljc1OGgtOS4yMnYyMS45NTJjLTMuMDczLTMuOTUxLTcuNDY0LTYuMTQ3LTEzLjE3MS02LjE0Ny0xMS44NTQgMC0yMS4wNzQgOS4yMi0yMS4wNzQgMjEuOTUyIDAgMTIuNzMyIDkuMjIgMjEuOTUyIDIxLjA3NCAyMS45NTIgNi4xNDcgMCAxMC41MzctMi4xOTUgMTMuMTcxLTYuMTQ3djUuMjY5aDkuMjJ2LTIxLjA3NHptLTMzLjgwNyAwYzAtNy40NjQgNC44My0xMy42MTEgMTIuNzMyLTEzLjYxMSA3LjQ2NCAwIDEyLjczMiA1LjcwOCAxMi43MzIgMTMuNjExIDAgNy40NjQtNS4yNjkgMTMuNjExLTEyLjczMiAxMy42MTEtNy45MDMtLjQzOS0xMi43MzItNi4xNDctMTIuNzMyLTEzLjYxMXptLTMwOC4yMTMgMHYtMjEuMDc0aC05LjIydjUuMjY5Yy0zLjA3My0zLjk1MS03LjQ2NC02LjE0Ny0xMy4xNzEtNi4xNDctMTEuODU0IDAtMjEuMDc0IDkuMjItMjEuMDc0IDIxLjk1MiAwIDEyLjczMiA5LjIyIDIxLjk1MiAyMS4wNzQgMjEuOTUyIDYuMTQ3IDAgMTAuNTM3LTIuMTk1IDEzLjE3MS02LjE0N3Y1LjI2OWg5LjIydi0yMS4wNzR6bS0zNC4yNDYgMGMwLTcuNDY0IDQuODMtMTMuNjExIDEyLjczMi0xMy42MTEgNy40NjQgMCAxMi43MzIgNS43MDggMTIuNzMyIDEzLjYxMSAwIDcuNDY0LTUuMjY5IDEzLjYxMS0xMi43MzIgMTMuNjExLTcuOTAzLS40MzktMTIuNzMyLTYuMTQ3LTEyLjczMi0xMy42MTF6Ii8+PHBhdGggZmlsbD0iI0ZGNUYwMCIgZD0iTTE4Ni41OTYgMzMuODA3aDEzOC4zMDF2MjQ4LjUwMmgtMTM4LjMwMXoiLz48cGF0aCBkPSJNMTk1LjM3NyAxNTguMDU4YzAtNTAuNDkxIDIzLjcwOS05NS4yNzQgNjAuMTUtMTI0LjI1MS0yNi43ODItMjEuMDc0LTYwLjU4OS0zMy44MDctOTcuNDY5LTMzLjgwNy04Ny4zNzEgMC0xNTguMDU4IDcwLjY4Ny0xNTguMDU4IDE1OC4wNThzNzAuNjg3IDE1OC4wNTggMTU4LjA1OCAxNTguMDU4YzM2Ljg4IDAgNzAuNjg3LTEyLjczMiA5Ny40NjktMzMuODA3LTM2LjQ0MS0yOC41MzgtNjAuMTUtNzMuNzYtNjAuMTUtMTI0LjI1MXoiIGZpbGw9IiNFQjAwMUIiLz48cGF0aCBkPSJNNTExLjQ5MyAxNTguMDU4YzAgODcuMzcxLTcwLjY4NyAxNTguMDU4LTE1OC4wNTggMTU4LjA1OC0zNi44OCAwLTcwLjY4Ny0xMi43MzItOTcuNDY5LTMzLjgwNyAzNi44OC0yOC45NzcgNjAuMTUtNzMuNzYgNjAuMTUtMTI0LjI1MXMtMjMuNzA5LTk1LjI3NC02MC4xNS0xMjQuMjUxYzI2Ljc4Mi0yMS4wNzQgNjAuNTg5LTMzLjgwNyA5Ny40NjktMzMuODA3IDg3LjM3MSAwIDE1OC4wNTggNzEuMTI2IDE1OC4wNTggMTU4LjA1OHoiIGZpbGw9IiNGNzlFMUIiLz48L3N2Zz4=';
      break;

    case 'amex':
      image =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBjeD0iMTcuNTQxJSIgY3k9IjE3LjQ2NiUiIGZ4PSIxNy41NDElIiBmeT0iMTcuNDY2JSIgcj0iOTEuMjM3JSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiM2NUJDRjEiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMjNBREUzIiBvZmZzZXQ9IjQ1LjQ2JSIvPjxzdG9wIHN0b3AtY29sb3I9IiMwREE2RTAiIG9mZnNldD0iNTAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzA1NTFDMyIgb2Zmc2V0PSIxMDAlIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGg1MTJ2NTEyaC01MTJ6Ii8+PHBhdGggZD0iTTQ1Ljc5MSAyMjAuOTM1bC05Ljc3My0yMy44MTMtOS43MTcgMjMuODEzaDE5LjQ4OXptMjE1LjI4OS05LjQ4M2MtMS45NjIgMS4xOTEtNC4yODMgMS4yMzEtNy4wNjMgMS4yMzFoLTE3LjM0NXYtMTMuMjY4aDE3LjU4MWMyLjQ4OCAwIDUuMDg0LjExMiA2Ljc3MSAxLjA3NyAxLjg1Mi44NyAyLjk5OCAyLjcyMiAyLjk5OCA1LjI4MSAwIDIuNjExLTEuMDkgNC43MTItMi45NDIgNS42Nzl6bTEyMy43MzkgOS40ODNsLTkuODgxLTIzLjgxMy05LjgyNyAyMy44MTNoMTkuNzA3em0tMjMwLjY1OCAyNS43NzZoLTE0LjYzN2wtLjA1NC00Ni43ODQtMjAuNzA0IDQ2Ljc4NGgtMTIuNTM2bC0yMC43NTgtNDYuODI1djQ2LjgyNWgtMjkuMDRsLTUuNDg2LTEzLjMyNGgtMjkuNzI5bC01LjU0MiAxMy4zMjRoLTE1LjUwN2wyNS41NjgtNTkuNzM1aDIxLjIxNGwyNC4yODQgNTYuNTU2di01Ni41NTZoMjMuMzA0bDE4LjY4NiA0MC41MjMgMTcuMTY1LTQwLjUyM2gyMy43NzJ2NTkuNzM1aC4wMDJ6bTU4LjMzOCAwaC00Ny42OTd2LTU5LjczNWg0Ny42OTd2MTIuNDM5aC0zMy40MTl2MTAuNzY3aDMyLjYxN3YxMi4yNDVoLTMyLjYxN3YxMS45MjloMzMuNDE5djEyLjM1NHptNjcuMjUxLTQzLjY0N2MwIDkuNTI0LTYuMzU3IDE0LjQ0NC0xMC4wNjEgMTUuOTIyIDMuMTI0IDEuMTg5IDUuNzkzIDMuMjkgNy4wNjMgNS4wMyAyLjAxNiAyLjk3MSAyLjM2NCA1LjYyNSAyLjM2NCAxMC45NnYxMS43MzVoLTE0LjQwMWwtLjA1NC03LjUzM2MwLTMuNTk0LjM0NC04Ljc2NC0yLjI1NC0xMS42MzctMi4wODYtMi4xMDEtNS4yNjYtMi41NTctMTAuNDA3LTIuNTU3aC0xNS4zMjd2MjEuNzI3aC0xNC4yNzd2LTU5LjczNWgzMi44NGM3LjI5NyAwIDEyLjY3My4xOTMgMTcuMjg5IDIuODYxIDQuNTE3IDIuNjY4IDcuMjI1IDYuNTY0IDcuMjI1IDEzLjIyN3ptMjIuODUgNDMuNjQ3aC0xNC41Njl2LTU5LjczNWgxNC41Njl2NTkuNzM1em0xNjkuMDE3IDBoLTIwLjIzM2wtMjcuMDY0LTQ0LjgzNHY0NC44MzRoLTI5LjA3OGwtNS41NTctMTMuMzI0aC0yOS42NmwtNS4zOTEgMTMuMzI0aC0xNi43MDdjLTYuOTQgMC0xNS43MjctMS41MzUtMjAuNzA0LTYuNjA3LTUuMDE4LTUuMDcyLTcuNjI5LTExLjk0Mi03LjYyOS0yMi44MDUgMC04Ljg1OSAxLjU2LTE2Ljk1OCA3LjY5Ny0yMy4zNTggNC42MTYtNC43NjcgMTEuODQ1LTYuOTY1IDIxLjY4NC02Ljk2NWgxMy44MjN2MTIuNzk5aC0xMy41MzNjLTUuMjExIDAtOC4xNTMuNzc1LTEwLjk4NyAzLjUzOS0yLjQzNCAyLjUxNS00LjEwNCA3LjI3LTQuMTA0IDEzLjUzMSAwIDYuNCAxLjI3MiAxMS4wMTQgMy45MjYgMTQuMDI4IDIuMTk4IDIuMzY0IDYuMTkzIDMuMDgxIDkuOTUxIDMuMDgxaDYuNDEybDIwLjEyNC00Ni45NzdoMjEuMzk0bDI0LjE3NCA1Ni41di01Ni41aDIxLjc0bDI1LjA5OCA0MS42MDJ2LTQxLjYwMmgxNC42MjV2NTkuNzMzem0tNDcxLjYxNiAxMS43MzNoMjQuMzk1bDUuNTAxLTEzLjI2OGgxMi4zMTVsNS40ODYgMTMuMjY4aDQ4di0xMC4xNDRsNC4yODUgMTAuMTg3aDI0LjkxOGw0LjI4NS0xMC4zMzh2MTAuMjk1aDExOS4yODlsLS4wNTYtMjEuNzc5aDIuMzA4YzEuNjE2LjA1NiAyLjA4OC4yMDUgMi4wODggMi44NzR2MTguOTA2aDYxLjY5N3YtNS4wN2M0Ljk3NiAyLjY2NyAxMi43MTcgNS4wNyAyMi45MDIgNS4wN2gyNS45NTZsNS41NTUtMTMuMjY4aDEyLjMxNWw1LjQzMiAxMy4yNjhoNTAuMDE4di0xMi42MDNsNy41NzQgMTIuNjAzaDQwLjA4MXYtODMuMzEyaC0zOS42Njd2OS44MzlsLTUuNTU1LTkuODM5aC00MC43MDN2OS44MzlsLTUuMTAxLTkuODM5aC01NC45OGMtOS4yMDMgMC0xNy4yOTMgMS4yODUtMjMuODI4IDQuODY1di00Ljg2NWgtMzcuOTQxdjQuODY1Yy00LjE1OC0zLjY5LTkuODI1LTQuODY1LTE2LjEyNS00Ljg2NWgtMTM4LjYxM2wtOS4zMDEgMjEuNTE4LTkuNTUxLTIxLjUxOGgtNDMuNjZ2OS44MzlsLTQuNzk2LTkuODM5aC0zNy4yMzVsLTE3LjI5MSAzOS42MTF2NDMuNzAxaC4wMDJ6TTUxMiAzMDIuMDE0aC0yNi4wMzljLTIuNiAwLTQuMzI3LjA5Ny01Ljc4MiAxLjA4LTEuNTA3Ljk2OC0yLjA4OCAyLjQwNS0yLjA4OCA0LjMwMiAwIDIuMjU1IDEuMjczIDMuNzkgMy4xMjQgNC40NTMgMS41MDcuNTI1IDMuMTI2LjY3OCA1LjUwNi42NzhsNy43NDMuMjA3YzcuODE0LjE5MyAxMy4wMjkgMS41MzYgMTYuMjA5IDQuODEyLjU3OS40NTYuOTI3Ljk2OCAxLjMyNSAxLjQ4di0xNy4wMTJ6bTAgMzkuNDE2Yy0zLjQ3IDUuMDc1LTEwLjIzMyA3LjY0OC0xOS4zODggNy42NDhoLTI3LjU5MXYtMTIuODJoMjcuNDc5YzIuNzI2IDAgNC42MzMtLjM1OSA1Ljc4Mi0xLjQ4Ljk5NS0uOTI1IDEuNjg5LTIuMjY4IDEuNjg5LTMuOSAwLTEuNzQyLS42OTQtMy4xMjQtMS43NDUtMy45NTQtMS4wMzctLjkxMi0yLjU0Ni0xLjMyNy01LjAzNC0xLjMyNy0xMy40MTUtLjQ1Ni0zMC4xNTEuNDE1LTMwLjE1MS0xOC41MDQgMC04LjY3MiA1LjUwNi0xNy44IDIwLjQ5OC0xNy44aDI4LjQ1OHYtMTEuODk1aC0yNi40NDFjLTcuOTc5IDAtMTMuNzc2IDEuOTExLTE3Ljg4MSA0Ljg4MnYtNC44ODJoLTM5LjEwOWMtNi4yNTQgMC0xMy41OTUgMS41NS0xNy4wNjggNC44ODJ2LTQuODgyaC02OS44Mzl2NC44ODJjLTUuNTU4LTQuMDEtMTQuOTM3LTQuODgyLTE5LjI2NS00Ljg4MmgtNDYuMDY2djQuODgyYy00LjM5Ny00LjI1OC0xNC4xNzYtNC44ODItMjAuMTM2LTQuODgyaC01MS41NTZsLTExLjc5OCAxMi43NjgtMTEuMDUtMTIuNzY4aC03Ny4wMTR2ODMuNDIxaDc1LjU2NWwxMi4xNTctMTIuOTcgMTEuNDUyIDEyLjk3IDQ2LjU3OC4wNDF2LTE5LjYyNGg0LjU3OWM2LjE4LjA5NiAxMy40NjktLjE1MyAxOS45LTIuOTMzdjIyLjUxNGgzOC40MTl2LTIxLjc0MmgxLjg1M2MyLjM2NSAwIDIuNTk4LjA5NyAyLjU5OCAyLjQ2MXYxOS4yOGgxMTYuNzA5YzcuNDEgMCAxNS4xNTUtMS44OTcgMTkuNDQ0LTUuMzM4djUuMzM4aDM3LjAyYzcuNzA0IDAgMTUuMjI3LTEuMDggMjAuOTUxLTMuODQ1di0xNS41NDF6bS01Ni45OS0yMy44ODRjMi43ODIgMi44NzkgNC4yNzMgNi41MTQgNC4yNzMgMTIuNjY3IDAgMTIuODYyLTguMDM1IDE4Ljg2NS0yMi40NDQgMTguODY1aC0yNy44Mjd2LTEyLjgyaDI3LjcxNWMyLjcxIDAgNC42MzItLjM1OSA1LjgzNi0xLjQ4Ljk4My0uOTI1IDEuNjg3LTIuMjY4IDEuNjg3LTMuOSAwLTEuNzQyLS43NjMtMy4xMjQtMS43NDMtMy45NTQtMS4wOTMtLjkxMi0yLjYtMS4zMjctNS4wODgtMS4zMjctMTMuMzYxLS40NTYtMzAuMDkzLjQxNS0zMC4wOTMtMTguNTA0IDAtOC42NzIgNS40NDgtMTcuOCAyMC40MjYtMTcuOGgyOC42NDJ2MTIuNzI1aC0yNi4yMDhjLTIuNTk4IDAtNC4yODcuMDk3LTUuNzI0IDEuMDgtMS41NjUuOTY4LTIuMTQ1IDIuNDA1LTIuMTQ1IDQuMzAyIDAgMi4yNTUgMS4zMjkgMy43OSAzLjEyNiA0LjQ1MyAxLjUwNy41MjUgMy4xMjYuNjc4IDUuNTYuNjc4bDcuNjkxLjIwN2M3Ljc1Ni4xODkgMTMuMDggMS41MzEgMTYuMzE2IDQuODA4em0tMTI4LjkxOC0zLjY5MmMtMS45MTEgMS4xMzQtNC4yNzUgMS4yMzEtNy4wNTUgMS4yMzFoLTE3LjM1NnYtMTMuNDI4aDE3LjU5MmMyLjU0NCAwIDUuMDg5LjA1NCA2LjgxOCAxLjA4IDEuODUyLjk2OCAyLjk1OCAyLjgyIDIuOTU4IDUuMzc4IDAgMi41NTgtMS4xMDcgNC42MTktMi45NTggNS43Mzh6bTguNjI4IDcuNDRjMy4xOCAxLjE3NCA1Ljc4IDMuMjc4IDYuOTk5IDUuMDE5IDIuMDE3IDIuOTE5IDIuMzA5IDUuNjQzIDIuMzY3IDEwLjkxM3YxMS44NTJoLTE0LjM0M3YtNy40OGMwLTMuNTk3LjM0Ni04LjkyMi0yLjMwOS0xMS43MDItMi4wODgtMi4xNDItNS4yNy0yLjY1NC0xMC40ODItMi42NTRoLTE1LjI2OHYyMS44MzZoLTE0LjM1NnYtNTkuNzg2aDMyLjk4NWM3LjIzMyAwIDEyLjUwMS4zMTkgMTcuMTkgMi44MjEgNC41MDkgMi43MjQgNy4zNDUgNi40NTYgNy4zNDUgMTMuMjc2LS4wMDIgOS41NDItNi4zNjYgMTQuNDEyLTEwLjEyNyAxNS45MDV6bTE4LjA0OC0zMi4wMDJoNDcuNjg0djEyLjM2NGgtMzMuNDU1djEwLjg2OWgzMi42Mzl2MTIuMTk4aC0zMi42Mzl2MTEuODk1bDMzLjQ1NS4wNTR2MTIuNDA1aC00Ny42ODR2LTU5Ljc4NnptLTk2LjM5MyAyNy41OTFoLTE4LjQ2M3YtMTUuMjI1aDE4LjYyOWM1LjE1OCAwIDguNzM4IDIuMTAyIDguNzM4IDcuMzMgMCA1LjE3MS0zLjQxNSA3Ljg5NS04LjkwNCA3Ljg5NXptLTMyLjY5MyAyNi43NThsLTIxLjkzNS0yNC4zNTMgMjEuOTM1LTIzLjU3OXY0Ny45MzJ6bS01Ni42NDctNy4wMjJoLTM1LjEyN3YtMTEuODk1aDMxLjM2NnYtMTIuMTk4aC0zMS4zNjZ2LTEwLjg2OWgzNS44MTlsMTUuNjI3IDE3LjQyMy0xNi4zMTkgMTcuNTR6bTExMy41ODMtMjcuNjNjMCAxNi42MDgtMTIuMzkxIDIwLjAzNy0yNC44NzkgMjAuMDM3aC0xNy44Mjd2MjAuMDUzaC0yNy43NjlsLTE3LjU5Mi0xOS43OTItMTguMjgzIDE5Ljc5MmgtNTYuNTkxdi01OS43ODZoNTcuNDYybDE3LjU3OCAxOS41OTcgMTguMTczLTE5LjU5N2g0NS42NTJjMTEuMzM4IDAgMjQuMDc3IDMuMTM5IDI0LjA3NyAxOS42OTZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+';
      break;

    case 'discover':
      image =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9Ijg2IiB2aWV3Qm94PSIwIDAgNTEyIDg2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMC40NDIlIiB5MT0iMTAuNTk5JSIgeDI9Ijg5LjI0NSUiIHkyPSI4My41MyUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRTI1NDI5IiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0Y5OUQzRSIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNMjcwLjM1Ni4zNjVjLTIzLjk4MiAwLTQzLjQ0IDE4LjczNS00My40NCA0MS44NTggMCAyNC41ODMgMTguNjEyIDQyLjk2IDQzLjQ0IDQyLjk2IDI0LjIwOCAwIDQzLjMyMS0xOC42MiA0My4zMjEtNDIuNDc4IDAtMjMuNzE2LTE4Ljk4Ni00Mi4zNC00My4zMjEtNDIuMzR6IiBpZD0iYiIvPjxmaWx0ZXIgeD0iLTUwJSIgeT0iLTUwJSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYyI+PGZlTW9ycGhvbG9neSByYWRpdXM9IjIiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRJbm5lcjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyLjUiIGluPSJzaGFkb3dTcHJlYWRJbm5lcjEiIHJlc3VsdD0ic2hhZG93Qmx1cklubmVyMSIvPjxmZU9mZnNldCBkeD0iMiIgZHk9IjIiIGluPSJzaGFkb3dCbHVySW5uZXIxIiByZXN1bHQ9InNoYWRvd09mZnNldElubmVyMSIvPjxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0SW5uZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIgcmVzdWx0PSJzaGFkb3dJbm5lcklubmVyMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zMDE2NTg3NDEgMCIgaW49InNoYWRvd0lubmVySW5uZXIxIi8+PC9maWx0ZXI+PC9kZWZzPjx1c2UgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsdGVyPSJ1cmwoI2MpIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGQ9Ik0yMy43NDYgMS44OTFoLTIzLjM1M3Y4MS40NTRoMjMuMjMyYzEyLjMyNSAwIDIxLjI0LTIuOTIxIDI5LjA1OS05LjM5OCA5LjI3OC03LjY5NSAxNC43ODEtMTkuMjk4IDE0Ljc4MS0zMS4yODkgMC0yNC4wNDgtMTcuOTY1LTQwLjc2Ni00My43MTktNDAuNzY2em0xOC41NzMgNjEuMTc2Yy01LjAyMiA0LjUzMS0xMS40ODYgNi40ODgtMjEuNzYgNi40ODhoLTQuMjY4di01My44NzNoNC4yNjhjMTAuMjc0IDAgMTYuNDkxIDEuODM0IDIxLjc2IDYuNTkzIDUuNDk1IDQuODg2IDguNzcyIDEyLjQ1MiA4Ljc3MiAyMC4yNjUgMCA3LjgyOS0zLjI3NyAxNS42Ni04Ljc3MiAyMC41Mjd6bTMyLjQ4IDIwLjI3OGgxNS44NzF2LTgxLjQ1NGgtMTUuODcxdjgxLjQ1NHptNTQuNzI3LTUwLjIwOWMtOS41MzktMy41MzQtMTIuMzQ2LTUuODY1LTEyLjM0Ni0xMC4yNDcgMC01LjEzNCA0Ljk5OC05LjAzOSAxMS44NDktOS4wMzkgNC43NjMgMCA4LjY3MSAxLjk1MyAxMi44MzYgNi41OGw4LjI5NC0xMC44NTJjLTYuODM5LTUuOTk4LTE1LjAyMS05LjA0Ny0yMy45NDYtOS4wNDctMTQuMzk4IDAtMjUuMzk5IDEwLjAyLTI1LjM5OSAyMy4zMiAwIDExLjI0NyA1LjEyNiAxNi45ODEgMjAuMDMxIDIyLjM2OSA2LjIzMyAyLjE4OCA5LjQwMSAzLjY0NiAxMC45OTMgNC42NDMgMy4xNzUgMi4wNzcgNC43NjkgNC45OTggNC43NjkgOC40MTYgMCA2LjYwNS01LjI1NyAxMS40ODMtMTIuMzUxIDExLjQ4My03LjU3NCAwLTEzLjY3NC0zLjc4Mi0xNy4zNDEtMTAuODY1bC0xMC4yNDcgOS45MDVjNy4zMTMgMTAuNzMzIDE2LjEwOSAxNS41MTEgMjguMjE0IDE1LjUxMSAxNi40ODggMCAyOC4wODQtMTEuMDA3IDI4LjA4NC0yNi43NTggMC0xMi45NDgtNS4zNjEtMTguODE1LTIzLjQ0My0yNS40MTl6bTI4LjQ0OSA5LjUyMWMwIDIzLjk2NSAxOC44MTUgNDIuNTI1IDQzLjAwNiA0Mi41MjUgNi44MzkgMCAxMi43MDEtMS4zNTIgMTkuOTE1LTQuNzU4di0xOC42OTdjLTYuMzYxIDYuMzU4LTExLjk4IDguOTE2LTE5LjE4OSA4LjkxNi0xNS45OTcgMC0yNy4zNjQtMTEuNjA2LTI3LjM2NC0yOC4xMDIgMC0xNS42MjYgMTEuNzIxLTI3Ljk2NSAyNi42MzgtMjcuOTY1IDcuNTYxIDAgMTMuMzExIDIuNjg2IDE5LjkxNSA5LjE1OXYtMTguNjk2Yy02Ljk2Mi0zLjUzMS0xMi43MTItNC45ODUtMTkuNTUyLTQuOTg1LTI0LjA2NyAwLTQzLjM2OSAxOC45MzUtNDMuMzY5IDQyLjYwNHptMTkxLjY1MSAxMy45NDhsLTIxLjc0My01NC43MTVoLTE3LjM0NmwzNC41NzkgODMuNTM0aDguNTQzbDM1LjE4My04My41MzRoLTE3LjIxOGwtMjIgNTQuNzE1em00Ni40MzkgMjYuNzM5aDQ1LjA2NnYtMTMuNzg5aC0yOS4xODh2LTIyLjAwMWgyOC4wNzJ2LTEzLjc5MmgtMjguMDcydi0xOC4wNzloMjkuMTg4di0xMy43OTJoLTQ1LjA2NnY4MS40NTR6bTEwNy45NTUtNTcuNDE1YzAtMTUuMjU5LTEwLjQ5LTI0LjAzOS0yOC44MjMtMjQuMDM5aC0yMy41Nzd2ODEuNDU0aDE1Ljg5NXYtMzIuNzM3aDIuMDhsMjEuOTc1IDMyLjczN2gxOS41NDRsLTI1LjY2Ny0zNC4zMTFjMTEuOTg4LTIuNDUxIDE4LjU3My0xMC42MzggMTguNTczLTIzLjEwNHptLTMxLjg4MiAxMy40NTJoLTQuNjIzdi0yNC42ODNoNC44NzdjOS45MTYgMCAxNS4yODcgNC4xNjUgMTUuMjg3IDEyLjA5MiAwIDguMTc4LTUuMzcyIDEyLjU5LTE1LjU0MSAxMi41OXoiIGZpbGw9IiMwQjEwMTUiLz48L3N2Zz4=';
      break;

    case 'maestro':
      image =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjM5OCIgdmlld0JveD0iMCAwIDUxMiAzOTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPjxwYXRoIGZpbGw9IiM2QzZCQkQiIGQ9Ik0zMjUuMjIzIDI4Mi42MjloLTEzOC40NDV2LTI0OC44MDNoMTM4LjQ0NXoiLz48cGF0aCBkPSJNMTk1LjU2NSAxNTguMjMzYzAtNTAuNDcxIDIzLjYzMS05NS40MjkgNjAuNDMtMTI0LjQwMS0yNi45MS0yMS4xODYtNjAuODczLTMzLjgzMi05Ny43ODMtMzMuODMyLTg3LjM4MSAwLTE1OC4yMTMgNzAuODQyLTE1OC4yMTMgMTU4LjIzM3M3MC44MzIgMTU4LjIzMyAxNTguMjEzIDE1OC4yMzNjMzYuOTEgMCA3MC44NzItMTIuNjQ1IDk3Ljc4My0zMy44MzItMzYuNzk5LTI4Ljk3My02MC40My03My45MzEtNjAuNDMtMTI0LjQwMSIgZmlsbD0iI0QzMjAxMSIvPjxwYXRoIGQ9Ik01MTIgMTU4LjIzM2MwIDg3LjM5MS03MC44MzIgMTU4LjIzMy0xNTguMjEzIDE1OC4yMzMtMzYuOTEgMC03MC44NzItMTIuNjQ1LTk3Ljc5My0zMy44MzIgMzYuODA5LTI4Ljk3MyA2MC40NC03My45MzEgNjAuNDQtMTI0LjQwMSAwLTUwLjQ3MS0yMy42MzEtOTUuNDI5LTYwLjQ0LTEyNC40MDEgMjYuOTItMjEuMTg2IDYwLjg4My0zMy44MzIgOTcuNzkzLTMzLjgzMiA4Ny4zODEgMCAxNTguMjEzIDcwLjg0MiAxNTguMjEzIDE1OC4yMzMiIGZpbGw9IiMwMDk5REYiLz48cGF0aCBkPSJNMzcyLjA2NSAzNTIuOTM0YzEuODQxIDAgNC40ODcuMzUyIDYuNTA5IDEuMTQ3bC0yLjgxNyA4LjYxMWMtMS45MzItLjc5NS0zLjg2My0xLjA1Ni01LjcxNC0xLjA1Ni01Ljk3NiAwLTguOTYzIDMuODYzLTguOTYzIDEwLjgwNHYyMy41NmgtOS4xNDR2LTQyLjAxaDkuMDU0djUuMWMyLjM3NC0zLjY5MiA1LjgwNS02LjE1NyAxMS4wNzYtNi4xNTd6bS0zMy43ODEgOS40MDZoLTE0LjkzOXYxOC45ODNjMCA0LjIxNSAxLjQ4OSA3LjAzMiA2LjA2NiA3LjAzMiAyLjM3NCAwIDUuMzYyLS43OTUgOC4wNzgtMi4zNzRsMi42MzYgNy44MTdjLTIuODk3IDIuMDIyLTcuNDY0IDMuMjU5LTExLjQxOCAzLjI1OS0xMC44MTQgMC0xNC41ODctNS44MDUtMTQuNTg3LTE1LjU2M3YtMTkuMTU0aC04LjUzMXYtOC4zNWg4LjUzMXYtMTIuNzQ2aDkuMjI1djEyLjc0NmgxNC45Mzl2OC4zNXptLTExNi45ODcgOC45NjNjLjk3Ni02LjA2NiA0LjY1OC0xMC4yMDEgMTEuMTY3LTEwLjIwMSA1Ljg4NSAwIDkuNjY4IDMuNjkyIDEwLjYzMyAxMC4yMDFoLTIxLjh6bTMxLjI5NyAzLjY5MmMtLjA5MS0xMy4wOTgtOC4xNzktMjIuMDYxLTE5Ljk1OS0yMi4wNjEtMTIuMzAzIDAtMjAuOTE1IDguOTYzLTIwLjkxNSAyMi4wNjEgMCAxMy4zNSA4Ljk2MyAyMi4wNTEgMjEuNTM4IDIyLjA1MSA2LjMyOCAwIDEyLjEyMi0xLjU3OSAxNy4yMjMtNS44ODVsLTQuNDg3LTYuNzdjLTMuNTExIDIuODE3LTcuOTk4IDQuMzk2LTEyLjIxMyA0LjM5Ni01Ljg4NSAwLTExLjI0Ny0yLjcyNi0xMi41NjUtMTAuMjgxaDMxLjE5NmMuMDkxLTEuMTQ3LjE4MS0yLjI4NC4xODEtMy41MTF6bTQwLjE1OS0xMC4yODFjLTIuNTQ1LTEuNTg5LTcuNzI2LTMuNjEyLTEzLjA4OC0zLjYxMi01LjAxIDAtNy45OTggMS44NTEtNy45OTggNC45MjkgMCAyLjgwNyAzLjE1OSAzLjYwMSA3LjExMiA0LjEyNWw0LjMwNi42MTRjOS4xNDQgMS4zMjggMTQuNjc3IDUuMTkxIDE0LjY3NyAxMi41NzUgMCA3Ljk5OC03LjAzMiAxMy43MTItMTkuMTU0IDEzLjcxMi02Ljg2MSAwLTEzLjE4OS0xLjc2LTE4LjE5OC01LjQ1Mmw0LjMwNi03LjEyMmMzLjA3OCAyLjM3NCA3LjY1NiA0LjM5NiAxMy45ODMgNC4zOTYgNi4yMzcgMCA5LjU3Ny0xLjg0MSA5LjU3Ny01LjEgMC0yLjM2NC0yLjM3NC0zLjY5Mi03LjM4NC00LjM4NmwtNC4zMDYtLjYxNGMtOS40MDYtMS4zMjgtMTQuNTA2LTUuNTQzLTE0LjUwNi0xMi4zOTQgMC04LjM1IDYuODYxLTEzLjQ1IDE3LjQ5NC0xMy40NSA2LjY4IDAgMTIuNzQ2IDEuNDk5IDE3LjEzMiA0LjM5NmwtMy45NTQgNy4zODR6bTExMi43MjItMy4wOThjLTEuODgxIDAtMy42MjIuMzMyLTUuMjQxLjk4Ni0xLjYxLjY2NC0zLjAwOCAxLjU4OS00LjE4NSAyLjc3Ny0xLjE3NyAxLjE4Ny0yLjEwMyAyLjYxNi0yLjc3NyA0LjI3NS0uNjc0IDEuNjYtMS4wMDYgMy40OTEtMS4wMDYgNS40ODMgMCAyLjAwMi4zMzIgMy44MjMgMS4wMDYgNS40ODMuNjc0IDEuNjYgMS42IDMuMDg4IDIuNzc3IDQuMjc1IDEuMTc3IDEuMTg3IDIuNTc1IDIuMTEzIDQuMTg1IDIuNzc3IDEuNjIuNjY0IDMuMzYuOTg2IDUuMjQxLjk4NiAxLjg4MSAwIDMuNjMyLS4zMjIgNS4yNDEtLjk4NiAxLjYyLS42NjQgMy4wMjgtMS41ODkgNC4yMDUtMi43NzcgMS4xOTctMS4xODcgMi4xMjMtMi42MTYgMi44MDctNC4yNzUuNjc0LTEuNjYgMS4wMDYtMy40ODEgMS4wMDYtNS40ODMgMC0xLjk5Mi0uMzMyLTMuODIzLTEuMDA2LTUuNDgzLS42ODQtMS42Ni0xLjYxLTMuMDg4LTIuODA3LTQuMjc1LTEuMTc3LTEuMTg3LTIuNTg1LTIuMTEzLTQuMjA1LTIuNzc3LTEuNjEtLjY1NC0zLjM2LS45ODYtNS4yNDEtLjk4NnptMC04LjY4MmMzLjI1OSAwIDYuMjc3LjU2MyA5LjA1NCAxLjcgMi43NzcgMS4xMjcgNS4xODEgMi42ODYgNy4yMDMgNC42NjggMi4wMzIgMS45ODIgMy42MTIgNC4zMjYgNC43NTggNy4wMjIgMS4xNDcgMi43MDYgMS43MiA1LjY0NCAxLjcyIDguODEzIDAgMy4xNjktLjU3MyA2LjEwNi0xLjcyIDguODEzLTEuMTQ3IDIuNjk2LTIuNzI2IDUuMDUtNC43NTggNy4wMzItMi4wMjIgMS45ODItNC40MjYgMy41MzEtNy4yMDMgNC42NjgtMi43NzcgMS4xMjctNS43OTUgMS42OS05LjA1NCAxLjY5LTMuMjU5IDAtNi4yNzctLjU2My05LjA1NC0xLjY5LTIuNzc3LTEuMTM3LTUuMTYxLTIuNjg2LTcuMTczLTQuNjY4LTIuMDEyLTEuOTgyLTMuNTkxLTQuMzM2LTQuNzM4LTcuMDMyLTEuMTQ3LTIuNzA2LTEuNzItNS42NDQtMS43Mi04LjgxMyAwLTMuMTY5LjU3My02LjEwNiAxLjcyLTguODEzIDEuMTQ3LTIuNjk2IDIuNzI2LTUuMDQgNC43MzgtNy4wMjIgMi4wMTItMS45ODIgNC4zOTYtMy41NDEgNy4xNzMtNC42NjggMi43NzctMS4xMzcgNS43OTUtMS43IDkuMDU0LTEuN3ptLTIzNy41NzYgMjIuMDYxYzAtNy4zODQgNC44MzktMTMuNDUgMTIuNzQ2LTEzLjQ1IDcuNTU1IDAgMTIuNjU1IDUuODA1IDEyLjY1NSAxMy40NSAwIDcuNjQ2LTUuMSAxMy40NC0xMi42NTUgMTMuNDQtNy45MDcgMC0xMi43NDYtNi4wNTYtMTIuNzQ2LTEzLjQ0em0zNC4wMTMgMHYtMjEuMDA1aC05LjEzNHY1LjFjLTIuOTA3LTMuNzgzLTcuMjkzLTYuMTU3LTEzLjI2OS02LjE1Ny0xMS43OCAwLTIxLjAwNSA5LjIyNS0yMS4wMDUgMjIuMDYxIDAgMTIuODI2IDkuMjI1IDIyLjA2MSAyMS4wMDUgMjIuMDYxIDUuOTc2IDAgMTAuMzYyLTIuMzc0IDEzLjI2OS02LjE1N3Y1LjFoOS4xMzR2LTIxLjAwNXptLTUxLjQ5NyAyMS4wMDV2LTI2LjM2N2MwLTkuOTI5LTYuMzI4LTE2LjYwOS0xNi41MTgtMTYuNy01LjM2Mi0uMDkxLTEwLjkwNSAxLjU3OS0xNC43NjggNy40NzUtMi44OTctNC42NTgtNy40NzUtNy40NzUtMTMuODkzLTcuNDc1LTQuNDc3IDAtOC44NzMgMS4zMTgtMTIuMzAzIDYuMjM3di01LjE4MWgtOS4xMzR2NDIuMDFoOS4yMjV2LTIzLjI4OWMwLTcuMjkzIDQuMDQ0LTExLjE2NyAxMC4yODEtMTEuMTY3IDYuMDY2IDAgOS4xNDQgMy45NTQgOS4xNDQgMTEuMDc2djIzLjM3OWg5LjIyNXYtMjMuMjg5YzAtNy4yOTMgNC4yMjUtMTEuMTY3IDEwLjI4MS0xMS4xNjcgNi4yNDcgMCA5LjIzNSAzLjk1NCA5LjIzNSAxMS4wNzZ2MjMuMzc5aDkuMjI1eiIgZmlsbD0iIzExMEYwRCIvPjwvc3ZnPg==';
      break;
  }

  return <Image width="100" height="25" src={image} />;
};

export default Issuer;