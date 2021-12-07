CREATE procedure [dbo].[InsertStatus]  
(  
@StatusName nvarchar(50),  
@Notes nvarchar(50),  
)  
AS  
BEGIN  
insert into Statuses (StatusName,Notes) values( @StatusName, @Notes)  
END  