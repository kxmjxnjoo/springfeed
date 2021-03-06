package com.ezen.springfeed.model;
import java.sql.Date;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Member {
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank(message = "아이디를 입력하세요")
	@Pattern(regexp = "[a-zA-Z1-9]{4,12}",
	message = "아이디를 다시 입력해주세요!")
	private String userid;
	
	@NotBlank(message = "비밀번호를 입력하세요") 
	@Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}",
	message = "비밀번호는 특수문자,영문,숫자를 포함하여 8~16자리로 생성해주세요.")
	private String password;
	
	@NotNull (message="이름을 입력하세요")
	@NotEmpty(message="이름을 입력하세요")
	private String name;
	
	@NotBlank (message="이메일을 입력하세요")
	@Email(message = "올바른 이메일 주소를 입력해주세요.")
	private String email;
	
	@NotNull (message="전화번호를 입력하세요")
	@NotEmpty(message="전화번호를 입력하세요")
	@Pattern(regexp = "(01[016789])(\\d{3,4})(\\d{4})", message = "휴대전화번호는 10~11자리 숫자만 입력해주세요.")
	private String phone;
	
	private String useyn;
	private String introduce;
	private String img;
	private Date indate;

	public Member(String userid, String password) {
		this.userid = userid;
		this.password = password;
	}

	public Member(String userid, String password, String name, String email) {
		this.userid = userid;
		this.password = password;
		this.name = name;
		this.email = email;
	}
}