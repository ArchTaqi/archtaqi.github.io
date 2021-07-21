---
layout:        post
title:         Google Calendar API in Your Application without Oauth Consent Screen
date:          2019-10-19 16:00:00
summary:       Short summary about how to use Google Calendar API to CRUD Events in Google Calendar Impersonating as other users.
categories:    blog
image:         /images/google-calendar-api-in-your-application-without-oauth-consent-screen/google-calendar-api-in-your-application-without-oauth-consent-screen.png
tags:          api
---

# Scenario

An Meeting Room booking app running internally in all of our offices. Employees and Clients Schedules meetings choosing Office, room and date time. Platform then Synchronize these meetings in Google Calendar in Organizer, attendee and meeting room specific calendar.

# Solution

To put events in Google Calendar without Oauth Consent Screen you need an Service Account with Domain Wide Delegation.

> An service account with Domain Wide delegation grants our application to access all users data in the organization (when using G-suite).


[Link to post ](https://medium.com/@ArchTaqi/google-calendar-api-in-your-application-without-oauth-consent-screen-4fcc1f8eb380)


---

