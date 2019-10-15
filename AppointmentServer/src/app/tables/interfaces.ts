export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
//['userId', 'user', 'userMobileNumber', 'userVehicleNo', 'userIntime', 'userHostname', 'userEstimatedtime', 'userStatus',];

export interface UserData1 {
  userId: string;
  user: string;
  userMobileNumber: string;
  userVehicleNo: string;
  userIntime: string;
  userHostname: string;
  userEstimatedtime: string;
  userStatus: string;
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}
