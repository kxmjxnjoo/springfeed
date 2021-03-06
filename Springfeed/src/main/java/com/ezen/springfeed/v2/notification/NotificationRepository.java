package com.ezen.springfeed.v2.notification;

import com.ezen.springfeed.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllNotificationByUserToOrderByCreateDateDesc(String userid);
}