package com.ezen.springfeed.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@Data
public class ReplyLike {

	@Id
	private Long id;

	@Column(name = "reply_num")
	private Integer replyNum;
	private String userid;
}